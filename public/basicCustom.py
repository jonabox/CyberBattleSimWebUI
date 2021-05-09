# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

"""Model a basic Capture the flag exercise with one node that has one vulnerability
See Jupyter notebook toyctf-simulation.ipynb for an example of
game played on this simulation.
"""
from cyberbattle.simulation import model as m
from cyberbattle.simulation.model import NodeID, NodeInfo, VulnerabilityID, VulnerabilityInfo
from typing import Dict, Iterator, cast, Tuple

default_allow_rules = [
    m.FirewallRule("RDP", m.RulePermission.ALLOW),
    m.FirewallRule("SSH", m.RulePermission.ALLOW),
    m.FirewallRule("HTTPS", m.RulePermission.ALLOW),
    m.FirewallRule("HTTP", m.RulePermission.ALLOW)]

# Network nodes involved in the Capture the flag game
nodes = {
    "Website": m.NodeInfo(
        services=[m.ListeningService("HTTPS"),
                  m.ListeningService("SSH", allowedCredentials=[
                      "ReusedMySqlCred-web"])],
        firewall=m.FirewallConfiguration(incoming=default_allow_rules,
                                         outgoing=default_allow_rules + [
                                             m.FirewallRule("su", m.RulePermission.ALLOW),
                                             m.FirewallRule("sudo", m.RulePermission.ALLOW)]),
        value=100,
        # If can SSH into server then gets FLAG "Shared credentials with
        # database user"
        properties=["MySql", "Ubuntu", "nginx/1.10.3"],
        owned_string="FLAG: Login using insecure SSH user/password",
        vulnerabilities=dict(
            ScanPageContent=m.VulnerabilityInfo(
                description="LeakedGitHubProjectUrl: Website page content shows a link to GitHub "
                            "repo",
                type=m.VulnerabilityType.REMOTE,
                outcome=m.LeakedNodesId(["GitHubProject"]),
                reward_string="WEBSITE page content has a link to github -> Github project discovered!",
                cost=1.0
            )
        )
    )
}

global_vulnerability_library: Dict[VulnerabilityID, VulnerabilityInfo] = dict([])

# Environment constants
ENV_IDENTIFIERS = m.infer_constants_from_nodes(
    cast(Iterator[Tuple[NodeID, NodeInfo]], list(nodes.items())),
    global_vulnerability_library)


def new_environment() -> m.Environment:
    return m.Environment(
        network=m.create_network(nodes),
        vulnerability_library=global_vulnerability_library,
        identifiers=ENV_IDENTIFIERS
    )


# NodeInfo
# """A computer node in the enterprise network"""
# # List of port/protocol the node is listening to
# services: List[ListeningService]
# # List of known vulnerabilities for the node
# vulnerabilities: VulnerabilityLibrary = dataclasses.field(default_factory=dict)
# # Intrinsic value of the node (translates into a reward if the node gets owned)
# value: NodeValue = 0
# # Properties of the nodes, some of which can imply further vulnerabilities
# properties: List[PropertyName] = dataclasses.field(default_factory=list)
# # Fireall configuration of the node
# firewall: FirewallConfiguration = FirewallConfiguration()
# # Attacker agent installed on the node? (aka the node is 'pwned')
# agent_installed: bool = False
# # Esclation level
# privilege_level: PrivilegeLevel = PrivilegeLevel.NoAccess
# # Can the node be re-imaged by a defender agent?
# reimagable: bool = True
# # Last time the node was reimaged
# last_reimaging: Optional[time] = None
# # String displayed when the node gets owned
# owned_string: str = ""
# # Machine status: running or stopped
# status = MachineStatus.Running
# # Relative node weight used to calculate the cost of stopping this machine
# # or its services
# sla_weight: float = 1.0




def add_node(name, services, vulnerabilities, value, properties, firewall, owned_string):
    new_node = m.NodeInfo(services, vulnerabilities, value, properties, firewall, owned_string=owned_string)
    nodes.setdefault(name, new_node)


services = [m.ListeningService("PING"), m.ListeningService("SSH")]
value = 100
properties = ["CTFFLAG:VMPRIVATEINFO"]
firewall = m.FirewallConfiguration(
    incoming=[m.FirewallRule("SSH", m.RulePermission.BLOCK,
                             reason="internet incoming traffic blocked on the VM by NSG firewall")],
    outgoing=[])
owned_string = "Shared credentials with database user"
vulnerabilities = dict(
    ScanPageContent=m.VulnerabilityInfo(
        description="LeakedGitHubProjectUrl: Website page content shows a link to GitHub "
        "repo",
        type=m.VulnerabilityType.REMOTE,
        outcome=m.LeakedNodesId(["GitHubProject"]),
        reward_string="WEBSITE page content has a link to github -> Github project discovered!",
        cost=1.0
    ),
    ScanPageSource=m.VulnerabilityInfo(
        description="Website page source contains refrence to browseable "
        "relative web directory",
        type=m.VulnerabilityType.REMOTE,
        outcome=m.LeakedNodesId(["Website.Directory"]),
        reward_string="Viewing the web page source reveals a URL to a .txt file and directory on the website",
        cost=1.0
    ),
    CredScanBashHistory=m.VulnerabilityInfo(
        description="bash history leaking creds - FLAG Stealing "
        "credentials for the monitoring user",
        type=m.VulnerabilityType.LOCAL,
        outcome=m.LeakedCredentials(credentials=[
                    m.CachedCredential(node="Website[user=monitor]", port="SSH",
                                       credential="monitorBashCreds")]),
        reward_string="FLAG: SSH history revealed credentials for the monitoring user (monitor)",
        cost=1.0
    ))

add_node("Azure#2", services, vulnerabilities, value, properties, firewall, owned_string)
