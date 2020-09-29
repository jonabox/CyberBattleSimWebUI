const domainToScenarios = {
    "Advanced Metering Infrastructure": [
        {
            "scenario_description": "An employee within the utility having valid authorization, issues a \u201cremote disconnect\u201d command to a large number of meters. The employee may be bribed, disgruntled, or socially engineered.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI1",
            "scenario_impact": "An instantaneous mass disconnect/reconnect over multiple feeders, if permitted by the system, could cause temporary blackouts due to circuit breaker trips until power on the grid can be rebalanced, A small number of disconnects could subvert the smart grid deployment and make the utility lose consumer confidence.",
            "scenario_name": "Authorized Employee Issues Unauthorized Mass Remote Disconnect",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The threat agent sends out unauthorized pricing information, such as Time-of-Use (TOU) pricing. This may result in either a loss or increase in utility revenue until the invalid price is recognized. At that point law suits may occur.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI10",
            "scenario_impact": "Potential for brownout or blackout depending upon the level of response from TOU participants, Utility will lose or gain revenue due to invalid prices, Lawsuits might be required to resolve the discrepancies.",
            "scenario_name": "Unauthorized Pricing Information Impacts Utility Revenue",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to send many spoofed meter \u201clast gasp\u201d messages to the AMI MDMS, indicating a power outage. As more spoofed messages are sent, the grid operator tries to reconfigure the grid to compensate, causing utilities to roll trucks to determine why meters continue to be unresponsive. (Note: This is a special case of failure scenarios AMI.14 and DR.3.)",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI11",
            "scenario_impact": "Cost to roll trucks to investigate fake outages, Loss of revenue and creation of a customer service situation, Loss of confidence by customers due to visible attempts to repair non-existent problems. This may lead to reduced customer acceptance of advanced programs such as DR, Loss of true system state visibility.",
            "scenario_name": "Spoofed Meter \u201cLast Gasp\u201d Messages Cause Fake Outage Description: A threat agent is able to send many spoofed meter \u201clast gasp\u201d messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A firewall rule is intentionally or unintentionally created allowing direct access from another network. Taking advantage of this rule, a threat agent subsequently gains access to the database that receives data from the customer accounts database. This enables the threat agent to steal customer personally identifiable information, including electricity usage data.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI12",
            "scenario_impact": ". Potential for breach of customer privacy and loss of customer confidence.",
            "scenario_name": "Improper Firewall Configuration Exposes Customer Data",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An authorized user gains physical access to the operations room and subsequently an unattended console. The authorized user then disconnects service to a customer\u2019s house.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI13",
            "scenario_impact": ". Unexpected power outage for a single customer.",
            "scenario_name": "Authorized User uses Unattended Console to Disconnect Customer",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A cellular phone provider\u2019s network is breached, allowing access to a private network leased to a utility for AMI command and control. The AMI implementation is vulnerable to replay attacks and DR messages are replayed to a group of customers. (Note: This is a special case of failure scenario DR.3.)",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI14",
            "scenario_impact": "Costs of customer service for complaints and investigations, Loss of revenue (if DR messages decrease power draw) or temporary loss of power to more critical uses (if messages increase power draw), Cost to re-secure the network.",
            "scenario_name": "Breach of Cellular Provider\u2019s Network Exposes AMI Access",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Inadequate security implementation in the AMI monitoring and control backup system allows a threat agent to execute an attack on the AMI implementation during a business continuity or disaster recovery scenario. Access to these backup systems allows a threat agent to perform malicious activity such as mass disconnects of meters, stopping or modifying DR messages, or creating large numbers of problem meter reports.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI15",
            "scenario_impact": "Power and revenue loss for disconnected customers, Outages due to inadequate power available at peak times, Cost for rolling trucks to investigate problem meters, Additional operational strain on the utility during a business continuity/disaster recovery situation.",
            "scenario_name": "Inadequate Security for Backup AMI Enables Malicious Activity",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The private key for the certificate authority (CA) used to set up a Public Key Infrastructure (PKI) at the headend is compromised, which allows a threat agent to impersonate the CA.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI16",
            "scenario_impact": "Costs incurred for rekeying, Potential for power overload if the threat agent is able to introduce malicious nodes in the metering system, Potential to perform security-relevant tasks such as firmware upgrades, configuration changes, etc. that are initiated from the CA.",
            "scenario_name": "Compromised Headend Allows Impersonation of CA",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A malicious individual creates a duplicate Access Point Name (APN) for the Group Special Mobile (GSM)-based cellular communications on an AMI network. The meters that are within the range then associate with the fake APN and do not receive messages from the AMI network.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI17",
            "scenario_impact": "Denial of Service for cellular-based functions within the AMI network, Cost to roll a truck to investigate unresponsive meter and to read meter data, Inability for meters to receive DR messages could cause customers to either pay more for power or experience a loss of power, If exploited on a large scale, potential outages could occur due to a utility\u2019s inability to implement DR.",
            "scenario_name": "Malicious Creation of Duplicate APN Prevents Valid AMI Messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Unauthorized devices gain access to a home area network (HAN). The devices can then be used to create a Denial-of-Service (DoS) condition so that DR messages cannot reach end customer devices. (Note: this is a special case of DR.1.)",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI18",
            "scenario_impact": "Inability to receive DR messages may cause affected customers to either pay more for power or to suffer a loss of usage of a device requiring power, Utility will have associated customer service and troubleshooting costs, If exploited on a large scale, potential outages could occur due to utility inability to implement DR.",
            "scenario_name": "Unauthorized Devices Create DoS and Prevent Valid DR Messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Time-stamping, sometimes used to detect replay attacks, gets out of sync between a meter and its respective AMI headend system, causing the meter to ignore legitimate commands it interprets as a potential replay attack. This causes loss of advanced metering functionality such as two-way communications, remote connect/disconnect, and metrology.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI19",
            "scenario_impact": "Higher cost, or no cost savings, to read meter data if remote reading fails, If exploited on a large scale, outages could occur due to utility inability to implement DR, Cost of associated customer service, late invoicing, and troubleshooting efforts.",
            "scenario_name": "Out of Sync Time-stamping Causes Discard of Legitimate Commands",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The Meter Data Management System (MDMS) is accessed by an employee (coerced or disgruntled) who selects a few accounts to overcharge or undercharge. This could be done by altering usage or pricing data. It may also be accomplished using malware. When the bills are paid, either the utility receives more or less revenue. An audit uncovering this activity could cause embarrassment or financial burden to the utility.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI2",
            "scenario_impact": "Utility may be liable for mischarging customers, Utilities will have to correct billing errors.",
            "scenario_name": "Authorized Employee Manipulates MDMS Data to Over/Under Charge",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An independent energy generator bribes an AMI operator to lower time-of.use (TOU) pricing to increase demand.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI20",
            "scenario_impact": ". Utility may lose revenue due to lower prices charged customers at a large volume.",
            "scenario_name": "Independent Energy Generator Causes Lower TOU Pricing",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility\u2019s field service laptop and optical probe are lost or stolen, exposing the software to control components of the AMI infrastructure (e.g., meters and concentrators) to any user.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI21",
            "scenario_impact": "Potential for unexpected and perhaps intermittent power loss for a targeted customer or for a large number of customers, and associated revenue loss for a utility, Impact may continue even after the laptop is retrieved if a copy of the laptop\u2019s OS and/or applications can be exfiltrated or recreated by the threat agent.",
            "scenario_name": "Stolen Field Service Tools Expose AMI Infrastructure Description: A utility\u2019s field service laptop and optical probe are lost or stolen, exposing",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent gains wireless access to a web-based administration page on an AMI device that controls the ability to disconnect power from the device.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI22",
            "scenario_impact": ". Unexpected power loss for the customer.",
            "scenario_name": "Wireless Access to AMI Administration Causes Invalid Disconnect",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility deploys all AMI devices with the same authentication credentials granting privileged access via the local infra-red port, and the credentials are compromised and posted on the Internet.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI23",
            "scenario_impact": ". Potential for unexpected and perhaps intermittent power loss for a targeted customer or for a large number of customers, and associated revenue loss for a utility.",
            "scenario_name": "Meter Authentication Credentials are Compromised and Posted on Internet",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An AMI vendor implements weak cryptography that is easy to crack, allowing access to and modification of configuration or data on that interface.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI24",
            "scenario_impact": "Cost to upgrade or to replace all devices, if upgrade is not feasible. This impact is expected whether or not a threat agent ever uses this vulnerability to launch an attack, Loss of customers\u2019 private information, and associated costs, Mass disconnect of meters potentially causing circuit breaker trips, resulting in temporary outages until power on the grid can be rebalanced.",
            "scenario_name": "Weak Cryptography Exposes AMI Device Communication",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to gain access to the AMI system by exploiting a known vulnerability that has not yet been patched. The threat agent is unable to access the AMI applications but can access other AMI devices and the headend system.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI25",
            "scenario_impact": "Access to an AMI headend, via an unpatched firewall and operating system for example, could permit a threat agent to shut down the AMI headend, Outages caused by an AMI headend shut down due to the utility\u2019s inability to implement DR at peak times, . Customer service and troubleshooting costs.",
            "scenario_name": "Known but Unpatched Vulnerability Exposes AMI Infrastructure",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The smart cards or magnetic cards for AMI billing are compromised. Example compromises include tampering with cards to change the credit amount, erasing the logic that decrements the credit amount remaining, or forging cards.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI26",
            "scenario_impact": ". Loss of revenue.",
            "scenario_name": "AMI Billing Cards are Compromised Incurring Loss of Revenue",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to reverse engineer AMI equipment (meters and concentrators) to determine how to remotely control them. This allows the threat agent to control many devices simultaneously, and, for example, to perform a simultaneous mass disconnect, send DR messages that cause consumption of electricity to go up dramatically, or cause devices to send out last gasp or self-test failed messages.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI27",
            "scenario_impact": "When demand can be manipulated quickly by a threat agent, there is the potential for outages while operators adjust generation to demand, Faked failure messages cause the utility to assume the cost of investigation and deploying technicians to resolve issues, as well as cost of their inability to address real problem meters due to the false event \u201cnoise.\u201d",
            "scenario_name": "Reverse Engineering of AMI Equipment Allows Unauthorized Mass Control",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility attempts to patch the AMI devices, but fails. Many AMI devices are no longer able to operate due to the failed patching process.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI28",
            "scenario_impact": "Cost to utility to repair or replace devices, Lack of capability to invoice customers, causing temporary financial loss, Loss of capability to perform DR, which may cause outages during periods of peak use, Cost of handling customer service situation.",
            "scenario_name": "Failed Patching Causes AMI Devices to Stop Operating",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An unauthorized device gains access to the HAN and uses the web interface to obtain private information. Examples of such information are patterns of energy usage and the presence of medical devices.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI29",
            "scenario_impact": "Privacy violations for customers, Loss of public confidence in AMI, even if the utility is not held legally responsible for the privacy violations, Costs of privacy breach notification if required of the utility.",
            "scenario_name": "Unauthorized Device Acquires HAN Access and Steals Private Information",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent acquires physical and logical access to the utility enterprise network. The threat agent installs remote accessible malware allowing remote command and control of the AMI system accessible from any available Internet connection. Physical access may be achieved via poor locks, unlocked doors, stolen credentials, or social engineering.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI3",
            "scenario_impact": "Potential remote command and control capability by a threat agent, Depending on the system\u2019s architecture and permissions, performance of meter disconnects.",
            "scenario_name": "Invalid Access Used to Install Malware Enabling Remote Internet Control",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent installs rogue firmware on multiple smart meters, bypassing any protection mechanism (e.g., checksums, signatures) and fully controlling smart meter behavior. This might be achieved via direct access to meters, via interception/modification of legitimate meter updates or via access to the headend.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI30",
            "scenario_impact": "Continuous loss of revenue for utility if modified firmware understates usage (impact scales as more meters are affected), Truck rolls needed to investigate compromised meter failure or nonresponsive meters.",
            "scenario_name": "Threat Agent Performs Unauthorized Firmware Alteration",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent prepares smart meter firmware containing malware and manually installs it on a target smart meter in each neighborhood. The single insertion point in each neighborhood becomes the bot master for a smart meter based botnet. The bot master acquires the IP address for the neighborhood's headend at the utility and spoofs that address. As other smart meters attempt to connect to the headend, the bot master sends a firmware update command to the smart meters and transmits the malicious firmware to each victim. Individual bots propagate the malicious firmware throughout the neighborhood and use them to achieve a mass remote disconnect scheduled at the same time.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI31",
            "scenario_impact": "An instantaneous mass disconnect/reconnect over multiple feeders, if permitted by the system, could cause temporary blackouts due to circuit breaker trips until power on the grid can be rebalanced, A small number of disconnects could subvert the smart grid deployment and make the utility lose consumer confidence.",
            "scenario_name": "Rogue Firmware Enables Unauthorized Mass Remote Disconnect",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Many smart meters provide the capability of re-calibrating the settings via an optical port, which is then misused by economic thieves who offer to alter the meters for a fee, changing the settings for recording power consumption and often cutting utility bills by 50-75%. This requires collusion between a knowledgeable criminal and an electric customer, and will spread because of the ease of intrusion and the economic benefit to both parties.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI32",
            "scenario_impact": ". The utility experiences a loss of revenue due to under billing.",
            "scenario_name": "Power Stolen by Reconfiguring Meter via Optical Port",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Meters are deployed with the same symmetric cryptographic key on all meters in the AMI implementation. A threat agent is able to acquire the secret encryption key after monitoring communications on the internal bus of one of these meters. The secret key is passed in the clear on the bus. Usage data is then manipulated to overstate/understate energy usage or to under/overstate energy production from Distributed Energy Resources (DERs).",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI4",
            "scenario_impact": "Continuous loss of revenue due to understated energy usage or overstated energy production, The utility may be liable for mischarging customers and may have to correct billing errors. If over-payments were received from customers, restitution would have to be paid to those customers, Loss of customer trust in the utility billing (negative publicity).",
            "scenario_name": "Overused Key Captured on Meter Bus Enables Usage Data Manipulation",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Meters are deployed with the same symmetric cryptographic key on all meters in the AMI implementation. Key compromise occurs in the field due to the ability to extract the secret key when in physical possession of a meter, or during distribution of keys to meters. In this failure scenario, no known financial or energy usage information is actually compromised due to the compromised key, but all the meters still need to be rekeyed to mitigate the potential for future malicious activities.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI5",
            "scenario_impact": "Negative publicity, Cost of rekeying meters.",
            "scenario_name": "Mass Meter Rekeying Required when Common Key Compromised",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An unauthorized entity installs rogue firmware or software on a single smart meter. This might be via direct access to the meter or via interception/modification of a legitimate meter update. The compromised meter software could report an understatement of usage, or cause sporadic failure of the self-test process to impede discovery. If meters in the system implement a mesh wireless network, the compromised meter might misroute communications from other meters, blocking the path back to the AMI headend for those meters and making those meters effectively \u201cunresponsive.\u201d",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI6",
            "scenario_impact": "Continuous loss of revenue for utility if modified software/firmware understates usage (impact scales as more meters are affected), Truck rolls needed to investigate compromised meter failure or nonresponsive meters due to misrouting.",
            "scenario_name": "One Compromised Meter in a Mesh Wireless Network Blocks Others",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Undesirable capabilities and features are discovered in smart meters deployed by a utility. This discovery may happen as the result of focused security research or because the utility discovers it has deployed a product containing the same compromised chipset used in a common consumer product.4 For example, an additional communications channel could be available on the meter, which, if activated, permits offloading of personally identifiable information (PII) or interferes with the functioning of the devices. The compromised smart meters will need to be upgraded or replaced.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI7",
            "scenario_impact": "Cost to upgrade or potentially replace meters, If violations of consumer privacy are proven, the utility may be subject to legal actions, If meters go \u201cdead\u201d or misstate usage, the utility would lose revenue from impacted customers until the meters are fixed or replaced.",
            "scenario_name": "Deployed Meters Containing Undesirable Functionality Need Repair",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Either due to spoofed tamper alarms or design/implementation problems with the legitimate alarm capability, false meter alarms overwhelm the AMI system and/or cause real meter alarms to be disabled or ignored.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI8",
            "scenario_impact": ". Disabling or ignoring of alarms leads to loss of metering tamper awareness and increases the impact of those failure scenarios in which meter tampering occurs.",
            "scenario_name": "False Meter Alarms Overwhelm AMI and Mask Real Alarms",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent obtains legitimate credentials to the AMI system via social engineering. The threat agent may already have access to the network on which this system resides or may succeed in reaching the network from another network. The threat agent issues a disconnect command for one or more target meters. Alternatively, a disconnect may be placed in a schedule and then occur automatically at a later time.",
            "scenario_domain_id": "AMI",
            "scenario_domain_name": "Advanced Metering Infrastructure",
            "scenario_id": "AMI9",
            "scenario_impact": "Customers experience power outages, Utility may need to roll a truck to identify the problem, Utility loses revenue (scales based on number of meters affected), Threat agent may use power outage to mask criminal activity at customer sites.",
            "scenario_name": "Invalid Disconnect Messages to Meters Impact Customers and Utility",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Distributed Energy Resources": [
        {
            "scenario_description": "A malicious individual accesses a FDEMS in a small-to medium-sized commercial or industrial site, and modifies the energy output, the volt-var curves, or other DER efficiency settings that were requested by the utility.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER10",
            "scenario_impact": "The utility loses financially due to the need to purchase higher costing energy and/or to operate the power system less efficiently, The customer experiences higher costs due to not meeting the utility efficiency requests.",
            "scenario_name": "Threat Agent Modifies FDEMS Efficiency Settings",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent gains access to a FDEMS in a small-to medium-sized commercial or industrial site, such as a shopping center, university campus, hospital complex, or manufacturing facility and installs malicious software. At a pre-planned time, the virus planted by the threat agent causes a synchronized shut down of all the DER systems on the site, either causing a complete or partial outage of the facility or forcing the facility to purchase additional power from the grid.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER11",
            "scenario_impact": "Depending upon the size of the facility, this unplanned loss of DER energy could cause power quality problems on the utility grid, including low voltage, harmonics, and a possible temporary feeder outage, The utility pays more for energy than necessary, The utility experiences loss of reputation, The customer experiences higher costs due to not meeting the utility requests.",
            "scenario_name": "Threat Agent Shuts Down Commercial/Industrial FDEMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A malicious individual accesses a utility FDEMS that manages DER generation and storage systems within a substation, and modifies the energy output, the volt-var curves, or other DER management settings. When the utility requests the FDEMS to control the DER systems to provide more vars, the FDEMS causes the DER systems to behave erratically and cause the substation to have power quality problems, including tripping of the transmission line breaker.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER12",
            "scenario_impact": "Power system power quality problems, including erratic supply of vars to the transmission system, An outage of all feeders in the substation.",
            "scenario_name": "Modified Management Settings for Substation FDEMS Impact Power Quality",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent compromises the operating system/operating environment platform of a FDEMS and installs malware. The malware leverages automated machine-to-machine authentication mechanisms and/or compromises stored cryptographic authentication keys to allow it to impersonate the authorized FDEMS software. This gives the threat agent complete control over all of the FDEMS resources and remote resources controlled or managed by the FDEMS.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER13",
            "scenario_impact": "The FDEMS owner may experience loss of revenue as well as possible penalties for not responding as contracted, Over a long period while avoiding detection, the threat agent can cause changes to the FDEMS commands to benefit a rival FDEMS installation, Other unexpected impacts, since the threat agent has undetected control of the FDEMS.",
            "scenario_name": "Custom Malware Gives Threat Agent Control of FDEMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent spoofs DER SCADA control commands to perform emergency shutdowns of a large number of DER systems simultaneously.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER14",
            "scenario_impact": "Power system instability, including outages and power quality problems, Utility legal costs related to DER owner litigation for loss of revenue.",
            "scenario_name": "DER Systems Shut Down by Spoofed SCADA Control Commands",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent modifies the industrial and the larger commercial DER data being monitored by the utility distribution DER SCADA system in real-time, altering the load value so that it is much higher than the actual value. Although this modification does not affect the monthly revenue metering for these DER systems, it causes the utility to request and pay for additional ancillary services from a neighboring DER storage system.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER15",
            "scenario_impact": "Increased utility costs for unnecessary ancillary services, Utility legal costs for finding and litigating the threat agent.",
            "scenario_name": "Threat Agent Spoofs DER Data Monitored by DER SCADA Systems",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent breaches a DER SCADA system and causes the DER SCADA system to issue an invalid command to all DER systems. Since DER systems may react differently to invalid commands, the power system experiences immediate and rapid fluctuations as some DER systems shut down, while others go into default mode with no volt-var support, still others revert to full output, and a few become islanded microgrids. The distribution equipment tries to compensate automatically, but causes more problems as the voltage experiences severe surges and sags.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER16",
            "scenario_impact": "Power system rapid fluctuations that cause power quality problems for customers, including outages, Equipment damage (that can lead to loss of life) due to power system surges and sags, Transmission power quality problem.",
            "scenario_name": "DER SCADA System Issues Invalid Commands",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A malicious individual modifies the utility DERMS system power flow analysis function (input, output, or power flow configuration) that determines what energy and ancillary services to request from the DER systems. Under these modifications, the results still remain \u201creasonable,\u201d but lead to benefits to some DER systems and to the detriment of others.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER17",
            "scenario_impact": "Financial gain for certain DER systems at the expense of the utility and/or other DER owners, Legal costs for litigation with adversely affected DER owners.",
            "scenario_name": "Utility DERMS Miscalculates DER Energy/Service Requests",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent gains access to the utility DERMS system and alters the conditions that determine when a utility has permission to disconnect a pre-established microgrid from the grid. This modification causes the microgrid either to disconnect at some random time in the future, or to prevent it from disconnecting even when it is supposed to disconnect (e.g., in the case of an outage).",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER18",
            "scenario_impact": "Since the microgrid may not be prepared to disconnect from the grid or may be brought down during the grid outage, it will experience a complete outage, Legal costs for litigation with the adversely affected customers.",
            "scenario_name": "Microgrid Disconnect Process Compromised via DERMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent uses a FDEMS to which they have full access, to access the utility\u2019s DERMS system. The threat agent is able to modify the DER commands, schedules, and requests sent to other DER systems, making these settings beneficial to their own DER systems, and consequently less beneficial to other DER systems.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER19",
            "scenario_impact": "Inefficient or cost-ineffective power system operated by the utility, Utility legal costs related to DER owner litigation for unfair practices.",
            "scenario_name": "Threat Agent Gains Access to Utility DERMS via FDEMS Description: A threat agent uses a FDEMS to which they have full access, to access",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The DER owner fails to change the default password or not set a password for the DER system user interface. A threat agent (inept installer, hacker, or industrial spy) gets access through the user interface and changes the DER settings so that it does not trip off upon low voltage (anti-islanding protection), but continues to provide power during a power system fault.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER1Inadequate",
            "scenario_impact": "THIS IS MISSING",
            "scenario_name": "Access Control of DER Systems Causes Electrocution",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An industrial or large commercial DER system is configured for local operational access through a wireless network, but is erroneously connected to the company\u2019s wireless corporate network, thus exposing the DER system to the Internet. Through the incorrect connection to the Internet, a threat agent gains control of the DER system and alters the operation of the DER functions to make them ignore utility commands and to turn off the \u201cacknowledge command\u201d interaction with the utility. The DER system may no longer limit power output during critical situations.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER2",
            "scenario_impact": "Utility power equipment is damaged, causing financial impacts and outages of customers, The utility experiences damage to its reputation due to smart grid anomalies, The utility\u2019s networked grid in a city may experience damaging reverse power flows, or overloads to substation transformers.",
            "scenario_name": "DER\u2019s Rogue Wireless Connection Exposes the DER System to Threat Agents via the Internet",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent accesses the DERMS system and modifies the weather data being used to forecast loads and DER generation/storage. Consequently, less than optimal requests are sent to DER systems, causing financial impacts to the utility.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER20",
            "scenario_impact": "Inefficient or cost-ineffective power system operated by the utility, Financial impact to the utility, Utility legal costs related to DER owner litigation for unfair practices.",
            "scenario_name": "Compromised DERMS Weather Data Modifies DER Output Forecasts",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent accesses the DERMS systems and steals the customer DER registration information, using it for industrial espionage or other purposes, causing confidentiality impacts to these utility customers. For example, if stolen, this information could allow other DER owners to manipulate the retail (or wholesale) energy markets, for instance by bidding in prices or energy products that make it less likely the DER system (whose data was stolen) would be willing/able to bid, or if they did bid, making it less cost-effective for them.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER21",
            "scenario_impact": "THIS IS MISSING",
            "scenario_name": "DER System Registration Information Stolen from DERMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "DELETED",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER22",
            "scenario_impact": "DELETED",
            "scenario_name": "DELETED",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent obtains control of the DER management system of a Retail Energy Provider (REP) (who might be a department within a utility or could be a Third Party). The REP then provides invalid information to the utility grid operators on the future availability of large amounts of DER energy and ancillary services. This causes the grid operator to make less-than-optimal market decisions on purchasing energy and ancillary services.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER23",
            "scenario_impact": "Potential financial losses (or gains) for the customers owning the DER systems, Major financial and reputation losses for the REP.",
            "scenario_name": "Utility Makes Incorrect Decisions Based on Invalid DER Information",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A Retail Energy Provider (REP) that manages a group of DER systems normally receives commands from the DERMS on what energy levels and ancillary services that group of DER systems should provide. A threat agent accesses confidential or private information in the DERMS DER database on customers who own DER systems, and uses that information to \u201cmarket\u201d to those customers.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER24",
            "scenario_impact": ". Utility legal costs related to DER owner litigation for loss of confidential and private information.",
            "scenario_name": "Retail Energy Provider Misuses Confidential/Private Information from DERMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent obtains control of the DER management system of a REP (who might be a department within a utility or could be a Third Party). The REP provides information to the utility grid operators that all DER systems will continue to function normally but then the compromised DER management system shuts down large amounts of DER energy and ancillary services.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER25",
            "scenario_impact": "Potential power outages for the grid operator, Potential financial losses for customers owning the DER systems, Potential major financial and reputation losses for the REP.",
            "scenario_name": "Threat Agent Unexpectedly Reduces Retail Energy Provider Output",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent spoofs messages that appear to come from a microgrid to the utility. The messages indicate that the pre-established conditions have been met for the utility to disconnect from the microgrid. The utility disconnects from the microgrid, even though these conditions are not actually met.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER26",
            "scenario_impact": "Since the microgrid may not be prepared to disconnect from the grid or may be brought down during the grid outage, it will experience a complete outage, Legal costs for litigation with the adversely affected customers.",
            "scenario_name": "Spoofed Microgrid Status Messages Cause Disconnect from Grid",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent, possibly a disgruntled employee of the DER vendor or a DER implementation company, makes malicious software changes to equipment software or firmware. This malware causes large numbers of DER systems to ignore certain critical commands from the utility. For example, after some future date, it prevents the DER systems from limiting their energy output when so commanded and then locks out any other commands.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER3",
            "scenario_impact": "Loss of a transformer, Financial loss to utility, Financial loss to DER owner, The combined effect causes a large reverse power flow in a substation and causes severe damage to a substation transformer. All DER software/firmware will have to be updated.",
            "scenario_name": "Malware Introduced in DER System During Deployment",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility is monitoring the energy and ancillary services provided by an industrial or commercial customer\u2019s DER system. The communication protocol that transports this information is intercepted and a threat agent gains access to the private generation data from the DER system because the protocol provides either no confidentiality or inadequate confidentiality. This private data is used to harm the customer.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER4",
            "scenario_impact": "Utility is sued for financial damages due to lost customer privacy, Utility reputation is damaged for not providing security for private information.",
            "scenario_name": "Confidential DER Generation Information Stolen to Harm Customer",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A DER system installed for the mutual benefit of a utility partnership with an industrial or commercial customer contains a Trojan horse, either embedded at the factory, added during installation, or inserted by maintenance personnel. The Trojan horse captures confidential market-related information from both the utility and the partner. An industrial competitor uses this market information to the detriment of both the utility and the customer.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER5",
            "scenario_impact": "Utility suffers from financial losses due to market manipulation by the industrial competitor, Utility is sued for financial damages due to lost customer confidentiality, Utility reputation is damaged for not being able to secure confidential information.",
            "scenario_name": "Trojan Horse Attack Captures Confidential DER Generation Information",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility-owned DER storage system is located in a substation to balance large feeder generation and load variations. A threat agent causes a sequence of commands, although valid individually, to arrive at the DER system in the wrong order (possibly through a replay attack), causing the DER system to create a greater imbalance and tripping off all customers served from that substation.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER6",
            "scenario_impact": "Outages for all customers served by the substation, Continued threat of outages until the cause of the improper DER system operation is determined and corrected, Utilities need to curtail customer generation and/or loads until the problem is corrected.",
            "scenario_name": "Compromised DER Sequence of Commands Causes Power Outage",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility-owned DER system is located in a substation with the primary purpose of providing additional power during a critical peak. A threat agent changes the time clock in the DER system through a false time-synchronization message, so that either the DER system believes that the critical peak event is over or that all time.stamped messages to it are invalid, so it goes into default shut-down mode.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER7",
            "scenario_impact": "The DER system performs an immediate shut down and causes damage to a transformer, Customer outages occur during the critical peak, Utilities need to curtail customer generation and/or loads until a new transformer is installed.",
            "scenario_name": "Incorrect Clock Causes Substation DER System Shut Down During Critical Peak",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A charging station employee (with system administrator authority) wants to increase the revenue of an electric vehicle (EV) charging station acting as a DER system. The employee modifies a utility command to \u201ccurtail the fast-charging rate\u201d or to change the time-stamp when the fast-charging limit command was received. During a peak period, many EVs simultaneously start charging, causing the distribution transformer to fail.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER8",
            "scenario_impact": "Transformer is damaged, Lawsuits between the utility and the EV charging station over responsibility for the cost to replace the failed transformer.",
            "scenario_name": "EV Charging Station Ignores Utility Command to Limit Fast-Charging",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A malicious or non-malicious individual causes the loss of DER control due to invalid or missing messages. Since the DER system either tries to act on invalid messages or no longer has messages constraining its output, it causes a distribution transformer to overload, thus causing an outage for the site and for neighboring sites. The DER system also sustains damage due to invalid settings.",
            "scenario_domain_id": "DER",
            "scenario_domain_name": "Distributed Energy Resources",
            "scenario_id": "DER9",
            "scenario_impact": "A distribution transformer is damaged, A local outage occurs that requires field crews to replace the damaged transformer, The DER system may sustain damage due to trying to act on invalid messages or not being constrained by expected messages that did not arrive.",
            "scenario_name": "Loss of DER Control Occurs due to Invalid or Missing Messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Distribution Grid Management": [
        {
            "scenario_description": "A threat agent uses a wireless signal jammer to disrupt wireless communications channels used to monitor and control distribution systems and substations. Examples are wireless local area network (LAN) communications for inter-substation differential protection, wireless communications between a distribution management system (DMS) and static VAR compensators (SVC), and communications to wireless monitoring equipment.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM1",
            "scenario_impact": "Reduced situational awareness and impaired ability to react to fluctuations in load and apply controlled remedies such as switching capacitor banks and triggering voltage regulators. This could cause voltage adjustment inefficiencies resulting in voltage sags and swells that can trigger unwanted over and under voltage trips on feeders or in substations, The uncoordinated capacitor banks due to loss of communications could conflict with substation load tap changer (LTC) actions, causing \u201chunting\u201d or other inefficient actions that increase utility power losses and premature transformer failures, Extreme or long-duration voltage and frequency instability can damage customer or utility equipment, Disruption in wireless communications between pilot protection relays can impede differential protection schemes, possibly leading to equipment damage in substations or feeders during fault conditions.",
            "scenario_name": "Wireless Signals are Jammed to Disrupt Monitoring and Control",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Switched capacitor banks can create large switching transients when connected to a utility feeder, generating voltage spikes up to twice the rated voltage and can be exacerbated when two are switched on back-to-back. A threat agent social engineers DMS Human Machine Interface (HMI) passwords to gain control of switched capacitor bank relays to repeatedly switch capacitor banks on and off, generating cascading voltage spikes and instability to trip protection devices.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM10",
            "scenario_impact": "Repeated voltage spikes may damage customer or utility equipment, Possible loss of customer power due to false operation of protective devices.",
            "scenario_name": "Switched Capacitor Banks are Manipulated to Degrade Power Quality",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent performs reconnaissance of utility communications, electrical infrastructure, and ancillary systems to identify critical feeders and electrical equipment. Threat agent gains access to selected elements of the utility DMS system .which includes all distribution automation systems and equipment in control rooms, substations, and on pole tops -via remote connections. After gaining the required access, the threat agent manufactures an artificial cascade through sequential tripping of select critical feeders and components, causing automated tripping of generation sources due to power and voltage fluctuations. A blackout of varying degree and potential equipment damage ensues. The remote connections might be established using a variety of methods or combination of methods. These include, but are not limited to, using a lost, stolen, or acquired utility linemen\u2019s laptop to access the DMS directly; compromising an active remote maintenance connection used for vendor DMS application maintenance; taking advantage of an accidental bridged connection to the internet due to DMS misconfiguration; or subverting distribution control communications directly.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM11",
            "scenario_impact": "Loss of customer power, Disclosure of proprietary utility documents or information, Possible customer and utility equipment damage.",
            "scenario_name": "Threat Agent Triggers Blackout via Remote Access to Distribution System",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent carries out a man in the middle attack, hijacking the wireless communications channel to a substation transformer. The threat agent uses this capability to disable transformer cooling fans and overheat the device. Depending on the transformer and its controller, this could be done through a direct command or by drastically increasing oil temperature setpoints. Many transformers are also custom built and have long lead times for replacement or repair.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM12",
            "scenario_impact": "Loss of customer power, Damage to critical substation equipment, Monetary loss.",
            "scenario_name": "Hijacked Substation Wireless Damages Substation Equipment",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "After a maintenance employee retires, computer services personnel forgot to deactivate the employees account on the DMS network. A week later, a threat agent uses the employee\u2019s credentials to access the DMS network. The threat agent alters DMS switching schedules so that automated and manual switching actions trip the wrong lines after a fault or before maintenance to cause power interruptions for critical loads, such as hospitals or prisons.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM13",
            "scenario_impact": "Loss of critical customer power, Possible loss of human lives, Negative publicity.",
            "scenario_name": "Poor Account Management Compromises DMS and Causes Power Loss",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Serial communications to substations over phone lines often lack authentication of field devices, such as RTUs. This might allow a threat agent to directly dial into modems attached to RTU equipment by war dialing city phone numbers or company phone extensions. Such techniques could allow a threat agent to send breaker trip commands to substation relays and disconnect feeders.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM14",
            "scenario_impact": "Loss of customer power, Monetary loss, Negative publicity.",
            "scenario_name": "Power loss due to lack of serial communication authentication",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent performs reconnaissance of utility maintenance operations to identify current or scheduled maintenance on distribution lines and equipment performed by utility linemen. The threat agent gains access to selected elements of the utility DMS system -which includes all distribution automation systems and equipment in control rooms, substations, and on pole tops -via remote connections. After gaining the required access, the threat agent energizes distribution lines or equipment that are under maintenance by linemen to elicit injury or death by electrocution. The remote connections might be established using a variety of methods or combination of methods. These include but are not limited to: using a lost, stolen, or acquired utility linemen\u2019s laptop to access the DMS directly; compromising an active remote maintenance connection used for vendor DMS application maintenance; taking advantage of an accidental bridged connection to the internet due to DMS misconfiguration; or subverting distribution control communications directly.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM15",
            "scenario_impact": "Maintenance personnel injury or death, Damage to company reputation, Financial loss, Possible customer and utility equipment damage.",
            "scenario_name": "Threat Agent Causes Worker Electrocution via Remote Access to Distribution System",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The Telco/Commercial Service Provider (CSP) provides communications capability between the utility\u2019s substation and headend/control center. Both wired and wireless based interfaces may be involved depending on the particular utility standards and site-specific constraints. Wired-based communication links can be analog or digital leased lines, while wireless interfaces are typically radio, cellular or even satellite based. To establish the Telco/CSP end-to-end communications, a point of demarcation (Demarc) is provided where the local utility owned communications infrastructure interfaces the telco owned network infrastructure (Error! Reference source not ound.). A knowledgeable threat agent can compromise the serial communications at the Demarc by intercepting and selectively modifying communicated data to masquerade as a user (man-in-the-middle) or replay attack, in which the threat agent captures control messages and subsequent retransmission with the intent of producing an unauthorized effect. This can potentially compromise both real-time (sometimes referred to as operational) traffic as well as non-real-time (sometimes referred to as non-operational) traffic. In the context of real-time data exchanges, the substation gateway or RTU in the substation or the SCADA Front End Processor (FEP) at the headend can be affected by manipulating command and control messages in the direction of the substation or information messages in the direction of the head end. In the case of non-operational data exchanges, IED settings can be potentially manipulated. Relevant vulnerabilities: Physical access may be obtained by unauthorized individuals to the utility or Telco/ISP, Unnecessary network access is permitted allowing access of threat agent to the demarc or within the service providers network CSU/DSU, System relies on credentials that are easy to obtain for access to substation gateway/RTU or SCADA FEP, Users lack visibility of unapproved access* to the demarc, Commands or other messages may be inserted on the network by unauthorized individuals* in the communication protocol, System makes messages accessible to unauthorized individuals over the serial link, Message modified by an adversary is either difficult or infeasible to distinguish from a valid message in the communication protocol, A copy of a prior message or command is difficult or infeasible to distinguish from a new legitimate message or command over the serial link. Impact: Loss of customer power, possibly to critical customers (e.g., hospital), Potential customer and utility equipment damage, Financial loss associated with any equipment damage or restoration to normal operations, Increase in public safety concerns (e.g., loss of heating or cooling on extremely cold or hot days), Negative impact on customer service due to increase in calls and complaints, Damage to goodwill toward utility. Potential Mitigations: Implement approved cryptographic algorithms to protect the integrity of communications and the cryptographic keys, Implement approved key management to protect the cryptographic keys, Detect unusual patterns of energy usage on Generation Automation (all utilities have some type of revenue protection scheme, but these may not be adequate), Detect unauthorized access in network traffic between substation and headend, Require authentication on all data exchanges, Encrypt communication paths for serial messaging by using bump-in-the-wire solution, Require multi-factor authentication by Telco/CSP to the device containing CSU/DSU units through service level agreement (SLA), Require tamper detection and response by Telco/CSP for the Demarc through SLA, Restrict physical access by implementing personnel security control procedures. 5.8 Generation Generation applications in the bulk generation domain are the first processes in the delivery of electricity to customers. Electricity generation is the process of creating electricity from other forms of energy, which may include a wide variety of sources, including chemical combustion, flowing water, wind, solar radiation, and geothermal heat. The scenarios that follow are not intended to be comprehensive but provide examples that range from an event that could threaten grid stability to those with localized business impacts illustrating the various types of vulnerabilities germane to power generation. GEN.1 Threat agent adds spurious trip parameters on remotely located plant support equipment and trips unit offline Description: A threat agent gains physical access to a river water pump house, connects a laptop to the local controls network, and adds a time-delay trip to the circulating water pumps triggered off of a normal value. This causes loss of cooling water flow resulting in the loss of condenser vacuum tripping the turbine and causing the plant to be tripped off line.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM16",
            "scenario_impact": "Loss of customer power, possibly to critical customers (e.g., hospital), Potential customer and utility equipment damage, Financial loss associated with any equipment damage or restoration to normal operations, Increase in public safety concerns (e.g., loss of heating or cooling on extremely cold or hot days), Negative impact on customer service due to increase in calls and complaints, Damage to goodwill toward utility.",
            "scenario_name": "Threat agent compromises serial control link to substation",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Some utilities depend upon communication providers for long-haul and wide area network (WAN) communications for monitoring and control of their distribution system. Furthermore, utilities that provide their own communication network for critical functions often resell unused bandwidth to offset costs while others have spun off their communication network as a separate communications company. There is also a general trend toward economizing communications costs by sharing them. A threat agent could take advantage of these paradigms by compromising computer systems using the same network as the Distribution Management System (DMS) to facilitate a distributed denial of service attack through the infected computer system by means of a botnet centered on IP spoofing and Internet Control Message Protocol (ICMP) flooding. With the network overburdened, monitoring and control functions could become unavailable for optimization or protection.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM2",
            "scenario_impact": "Reduced situational awareness and impaired ability to react to fluctuations in load and apply controlled remedies such as switching capacitor banks and triggering voltage regulators. This could cause voltage adjustment inefficiencies resulting in voltage sags and swells that can trigger unwanted over and under voltage trips on feeders or in substations, The uncoordinated capacitor banks due to loss of communications could conflict with substation load tap changer (LTC) actions, causing \u201chunting\u201d or other inefficient actions that increase utility power losses and premature transformer failures, Extreme or long-duration voltage and frequency instability can damage customer or utility equipment, Disruption in wireless communications between pilot protection relays can impede differential protection schemes, possibly leading to equipment damage in substations or feeders during fault conditions.",
            "scenario_name": "Shared Communications Leveraged to Disrupt DMS Communications",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent injects malicious code into substation equipment through physical access of engineering serial ports or by memory update devices such as USB memory sticks, Secure Digital (SD) cards or Compact Flash (CF) cards. Examples of target equipment include communications concentrators, remote terminal units (RTUs), and protection relays. Malicious code could change device settings for purposes of rendering equipment inoperable, data gathering, denial of service, or misconfiguration.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM3",
            "scenario_impact": "Substation components could be modified to fail detection and clearing of bus and feeder faults (although these can be managed by reclosers which are not necessarily in the substation). These faults could lead to destruction of electrical grid equipment, Substation components could be reprogrammed to disallow feeder sectionalizing or service restoration via SCADA. However, these are frequently done manually, Modification of devices controlling VOLT/VAR equipment, including load tap changers, SVCs, automatic voltage regulators, and synchronous condensers, could prevent direct voltage control leading to potential customer equipment damage, over/under voltage trips, or additional power losses, Equipment firmware changes may create the need for equipment servicing that can be costly and time consuming, Possible lack of monitoring capabilities reduces situational awareness, inhibits a utility\u2019s ability to react proactively, and could increase the number and duration of failures.",
            "scenario_name": "Malicious Code Injected into Substation Equipment via Physical Access",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent uploads malicious code into substation equipment via remote engineering access, either through an IP network WAN or dialup to a line-sharing switch (LSS). Examples of target equipment include communication concentrators, RTUs, and protection relays. Connections with peers are another avenue of attack. Some distribution substations, particularly in urban environments, use Bluetooth or ZigBee for access to reduce the need for crews to install underground cables. Malicious code could change device settings for purposes of rendering equipment inoperable, data gathering, denial of service, or misconfiguration.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM4",
            "scenario_impact": "Substation components could be modified to fail detection and clearing of bus and feeder faults (although these can be managed by reclosers which are not necessarily in the substation). These faults could lead to destruction of electrical grid equipment, Substation components could be reprogrammed to disallow feeder sectionalizing or service restoration via SCADA. However, these are frequently done manually, Equipment firmware changes may create the need for equipment servicing that can be costly and time consuming, Possible lack of monitoring capabilities reduces situational awareness, inhibits a utility\u2019s ability to react proactively, and could increase the number and duration of failures.",
            "scenario_name": "Malicious Code Injected into Substation Equipment via Remote Access",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent compromises distribution management system (DMS) functionality through remote access modification of executable programs and libraries, rendering the DMS inoperable.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM5",
            "scenario_impact": "Reduced situational awareness and impaired ability to react to fluctuations in load and apply controlled remedies, Possible increase in outage durations, Decrease in operational efficiency and increase in utility power losses, Decrease in service reliability, Decrease in customer satisfaction.",
            "scenario_name": "Remote Access Used to Compromise DMS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Threat agent spoofs data inputs from field devices at substations and below to cause the DMS to report a false system state. This could cause operator or automated responses that are inappropriate.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM6",
            "scenario_impact": "Inappropriate fault-clearing actions, feeder sectionalization, and overuse of remedial capabilities leading to loss of power to customers, Volt/VAR controls are wrongly applied or adjusted based on erroneous data, possibly triggering over/under voltage trips, Collected meter data is incorrect or inaccurate, leading to possible loss in revenue.",
            "scenario_name": "Spoofed Substation Field Devices Influence Automated Responses",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Assuming the same communications system serves DGM, DR, AMI, and many other services at the distribution level, a Quality of Service (QoS) allocation of bandwidth is necessary. QoS can be spoofed and if end device classifications are trusted, a threat agent can escalate the priority of malevolent data streams. If denial of service is the goal, the threat agent could spoof the QoS of flooded ICMP packets to prevent the transmission and reception of monitoring and control packets.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM7",
            "scenario_impact": "An end device could cause a denial of service to critical applications such as control of feeder sectionalizers and capacitor banks. In combination with a volatile electrical grid situation, this could lead to power failures, Reduced situational awareness and impaired ability to react to fluctuations in load and apply controlled remedies such as switching capacitor banks and triggering voltage regulators. This could cause voltage adjustment inefficiencies resulting in voltage sags and swells that can trigger unwanted over and under voltage trips on feeders or in substations, Extreme or long-duration voltage and frequency instability can damage customer or utility equipment, Denial of service in wireless communications between pilot protection relays can impede differential protection schemes, possibly leading to equipment damage in substations or feeders during fault conditions.",
            "scenario_name": "QoS Spoofed to Create Denial of Service for DGM Communications",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Lifecycle attacks against equipment during development, production, shipping, and maintenance can introduce deliberate errors that will result in failure under special conditions. For example, a threat agent might upload modified firmware in a relay during production that introduces a back door for changing relay settings and set points. This could render the relay inoperable or cause it to operate unexpectedly.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM8",
            "scenario_impact": ". Any ill effect, including the most severe, is possible using this mechanism.",
            "scenario_name": "Supply Chain Vulnerabilities Used to Compromise DGM Equipment",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent could take advantage of the confusion, lack of security, and hasty reconstitution of the distribution grid after a disaster. For example, a threat agent could delay the recovery effort by leveraging temporary communications with low security to access DMS to switch breakers. Likewise this objective could be achieved by subverting weak physical security at substations (due to damage or communication outages) to access engineering or console ports or relays to change settings and render them inoperable. Further, the interception of temporary communications with low security might support reconnaissance of high priority vulnerabilities to aid in future attacks.",
            "scenario_domain_id": "DGM",
            "scenario_domain_name": "Distribution Grid Management",
            "scenario_id": "DGM9",
            "scenario_impact": "Delay, damage, disruption, or denial of the recovery effort, Damage, disruption, or destruction of a system or components long after the disaster recovery, Theft of historian, configuration, or customer information that could support future attacks.",
            "scenario_name": "Weakened Security during Disaster enables DGM Compromise",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Demand Response": [
        {
            "scenario_description": "A threat agent blocks communications between a demand response automation server (DRAS) and a customer system (smart meters or customer devices). This could be accomplished by flooding the communications channel with other messages, or by tampering with the communications channel. These actions could prevent legitimate DR messages from being received and transmitted. This can occur at the wired or the wireless portion of the communications channel.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR1",
            "scenario_impact": "The effects would be correlated to the extent of blockage: o If the blockage is local, the impact may be limited to increased energy charges to consumers, o Blockage of DR messages on a larger scale, particularly messages to large industrial customers, may cause outages at a local or regional level if demand is too great and increased energy costs to customers over a larger area, In sell-back or brokerage scenarios, the blockage of DR signals may result in increased prices for electricity for the utility company and be instrumented for considerable financial gain for parties selling electricity back to the utility company.",
            "scenario_name": "Blocked DR Messages Result in Increased Prices or Outages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent eavesdrops on traffic on the network between a DRAS and a customer system. This could leak private information to the threat agent. This might be the easiest attack that the agent can launch while not being detected by utilities.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR2",
            "scenario_impact": "Malicious eavesdropping can reveal private information that may be made public. This violates customer privacy, Potential for lawsuits and fines against the utility, Loss of public confidence in the utility and the DR program, resulting in resistance to both.",
            "scenario_name": "Private Information is Publicly Disclosed on DRAS Communications Channel",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent obtains access to the communications channel between the DRAS and the customer DR system, modifies on-going traffic or communications, inserts false messages, or launches a replay attack. The DRAS and the customer system could receive an unauthorized message or a corrupted message. Such a message may cause unintentional (often unfavorable) behaviors of these systems. (Note: Spoofed last gasp messages as in AMI.11 is an important special case of this failure scenario.)",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR3",
            "scenario_impact": "A false message may request the DRAS to reduce power supply or to trigger an inappropriate DR event, A false message may deliver information indicating cheaper prices to consumers, which encourages them to increase power consumption during on-peak periods, Possible service impacts on various (possibly quite large) scales, Potential power loss, The utility may have financial impacts.",
            "scenario_name": "Messages are Modified or Spoofed on DRAS Communications Channel",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent maliciously modifies the DRAS configuration to send (or not send) DR messages at incorrect times and to incorrect devices. This could deliver a wrong, but seemingly legitimate set of messages to the customer system.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR4",
            "scenario_impact": "A false message may deliver information indicating lower prices to consumers, which encourages them to increase power consumption during on-peak periods, Damage to the smart grid infrastructure with possible service impacts from small to large scale, Potential power loss, The utility may have financial impacts, In sell-back or brokerage scenarios, withholding of DR signals at the source DRAS may result in increased prices for electricity to the utility and be instrumented for considerable financial gain for parties selling electricity back to the utility company, Loss of public confidence in utility and DR program, o The customer, receiving an unintended DR message, may reduce power consumption without seeing any benefit applied in their bill.",
            "scenario_name": "Improper DRAS Configuration Causes Inappropriate DR Messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The DRAS or customer DR system is infected by non-specific common malware. This malware may consume system resources, thus slowing other system processes or may attempt to compromise typical components such as databases. This could cause the DRAS to fail to send DR messages when needed or to disclose customer information in its database. It could cause the customer system not to execute the contractual terms of the DR service although it receives legitimate DR messages.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR5",
            "scenario_impact": "Unstable power balance at the utility due to failure to communicate or execute reduction of power demand during on-peak periods, possibly resulting in loss of power for some customers, Potential revenue loss due to failure to communicate or execute a return to non-peak conditions in which customers may increase usage, Capture and exfiltration of sensitive DR information would violate customer privacy, Loss of public confidence in the utility and DR program.",
            "scenario_name": "Non-specific Malware Compromises DRAS or Customer DR System",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent injects purpose-built malware into the DRAS. This malware places the server under remote command of this agent. The agent might use this capability to send out DR messages appropriate for non-peak times at peak times, and vice versa.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR6",
            "scenario_impact": "Addition of extra load at peak times and reduction of load at non-peak times could result in power outages and physical power system damage, Loss of public confidence in the utility and DR program.",
            "scenario_name": "Custom Malware Compromises DRAS",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent injects a malware into a customer DR system that runs an OpenADR client program at the gateway of the customer domain. The malware might be controlled remotely by the agent or could directly change the behaviors of the customer DR system without any remote connection. As a consequence, the compromised DR system sends incorrect DR messages back to the DRAS. For instance, it sends a false DR registration message to the DRAS, when registering the customer's capability of energy reduction -the false message informs the DRAS that the customer is able to reduce 500kW, although he cannot. Alternatively, the compromised DR system sends a false DR report message to the DRAS, after the DR event finishes .the false message informs the DRAS that the customer reduced 500kW, although the customer actually reduced 100kW.",
            "scenario_domain_id": "DR",
            "scenario_domain_name": "Demand Response",
            "scenario_id": "DR7",
            "scenario_impact": "Incorrect estimation of the total energy reduction before/during/after the DR event period, which can lead to the failure of the DR program, Potential power outages for the grid operator, The utility may have financial impacts -it computes customer incentives based on customer energy usage information, Loss of public confidence in the utility and DR program.",
            "scenario_name": "Custom Malware Compromises Customer DR System",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Electric Transportation": [
        {
            "scenario_description": "A threat agent directly accesses and compromises the Electric Vehicle (EV) firmware or inserts a Trojan horse to always indicate the EV is undercharged. Consequently, the battery becomes overcharged and may eventually explode.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET1",
            "scenario_impact": "Possible loss of life and property damage, A tragic accident can lead to a loss of public confidence.",
            "scenario_name": "Custom Malware causes EV Overcharge and Explosion",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The registration identity of a high priority EV (such as a fire truck, ambulance, or police car) is copied and used by a normal priority vehicle to get high priority (faster) charging at a charging station.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET10",
            "scenario_impact": ". Possibility for slower charging of high priority or other normal priority vehicles.",
            "scenario_name": "High Priority EV Registration Identity Misused to Obtain Faster Charging",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A utility has all its EV registration identities stolen and must therefore re.issue new registration identities to all EVs.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET11",
            "scenario_impact": "Cost of reissuing identities and verifying receipt of new identities so that stolen ones can be cancelled, Loss of revenue while any stolen identities remain valid, Inconvenience to customers, Cost of handling customer service situations.",
            "scenario_name": "All EV Registration IDs Stolen from Utility",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An EV owner belongs to utility A and uses the \u201cutility smart card\u201d to charge his EV at a utility B's charging station. If the two utilities have a business contract so that the owner must receive a special rate, the communications between the two utilities must be protected. A threat agent could compromise the communication paths or involved systems, so that utility B is unable to obtain information from utility A regarding the EV owner's rate. As a result, the customer may not receive the preferential rate.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET12",
            "scenario_impact": "Customer inconvenience, Cost of customer service situation handling complaints and coordinating refunds with servicing utility. It is assumed that customers will still be able to charge their EVs by using standard credit cards so they are not denied service.",
            "scenario_name": "Unavailable Communication Blocks Customer Use of EV Preferential Rate",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent (possibly a disgruntled employee) accesses the utility's EV registration database and invalidates selected EV registration identities. This would prevent those EVs from charging at the preferential rate if they were allowed to charge.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET13",
            "scenario_impact": ". Serious inconvenience and embarrassment to customers in any situation where credit cards or other billing methods using the regular electricity rate are not available. One example is a visitor to any non-retail location where the party responsible for the electricity account for the facility visited is not expected to pay the visitor\u2019s bills (such as a contractor travelling to a job site or a professor\u2019s visit to a colleague), . Cost of customer service situations to handle complaints and to coordinate refunds with other utilities. This assumes that in a retail situation the customer will still be able to charge their EV by using standard credit cards so they are not denied service. Also assumed is that when at home, the customer would be billed at the standard rate if their registration identify was invalid.",
            "scenario_name": "Invalidated EV Registration ID Blocks Customer use of Preferential Rate",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent (possibly a disgruntled employee who wants to embarrass the utility) modifies the verification software that accesses the utility's EV registration database, and introduces random delays in validating EV identities when the vehicles are trying to charge. This would slow down, but not necessarily prevent charging.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET14",
            "scenario_impact": "Inconvenience to customers, Cost of handling customer complaints, Cost of troubleshooting problem, Embarrassment to the utility, Creates poor perception of the usability of EVs.",
            "scenario_name": "EV Charging Process Slowed by Validation Delay of EV Registration ID",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent compromises the Vehicle-to-Grid (V2G) protocol that allows bi-directional flows of electricity. The threat agent may hack a protocol translation module directly or insert malware in the charging station management system. The malware could cause vehicles to discharge partially or completely without the owner\u2019s consent.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET15",
            "scenario_impact": "Critical damage to electric vehicles, Inconvenience to customers, Cost of customer service situations, Violation of customer contracts and loss of customer confidence, A sudden, large amount of electricity from EVs could damage a transformer in a neighborhood.",
            "scenario_name": "Malware Causes Discharge of EV to the Grid",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent exploits an in-vehicle system at an EV to inject malware to an EVSE in a charging station. In the near future, such systems will be connected both to the battery via a vehicle data bus (e.g., CAN bus) and to the EVSE via wireless channels (e.g., ZigBee). Once compromised, an EVSE may infect other EVSEs, creating a botnet. The compromised EVSEs could simultaneously charge or discharge all the plugged EVs, thus overloading the distribution transformer. Alternatively, they may launch an attack directly to a charging station management system or to a distribution operator system that controls the transformer and the substation.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET16",
            "scenario_impact": "Potential to overpower and damage transformer in a neighborhood, Temporarily loss of capability for charging station to service customers, Potential damage to electric vehicles, Revenue loss of the owner of the charging stations due to their damage, Violation of customer contracts and loss of customer confidence.",
            "scenario_name": "An EV is Exploited to Threaten Transformer or Substation",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to compromise a fast-charging station management system. When a large number of electric vehicles are connected to charging stations, the threat agent modifies the charge-staggering algorithm such that fast-charging begins concurrently for all the EVs, thus overloading the distribution transformer, causing a local outage, and preventing the EVs from being charged.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET2",
            "scenario_impact": "Power outage to EVs and the charging station, Damage to the distribution transformer.",
            "scenario_name": "Simultaneous Fast Charges cause Transformer Overload",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent such as a disgruntled employee or an employee subjected to social engineering could inject a virus into the computer system of an EV at an EV maintenance center or at a factory. Although not present today, future wireless communication technologies for Vehicle-to-Infrastructure (V2I) could enable a vehicle to establish additional data communications channels through which the virus infects public charging stations. A public charging station may in turn infect other EVs. The virus could harm other key functions for car safety in the EV as well as charging functions in the EV and EVSE (Electric Vehicle Service Equipment).",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET3",
            "scenario_impact": "For affected EVs, range from minor nuisances to major safety problems which could cause loss of life, For affected EVSE\u2019s, potential for arbitrary malfunctions and revenue loss due to shutting down charging stations for troubleshooting, Negative publicity concerning EVs, Litigation for owner of charging station.",
            "scenario_name": "Virus Propagated between EVs and EV Service Equipment (EVSE)",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent cracks through an enterprise firewall and exploits a weak operating system password. Because of a poor database server security configuration, the threat agent is able to obtain confidential utility records regarding charging locations for specific vehicles from the database.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET4",
            "scenario_impact": "Privacy violation for customers, Potential cost to the utility because of privacy lawsuits by customers, Potential legal action by government or regulatory agencies against the utility if applicable privacy laws are violated, Decrease in usage of utility charging stations and public relations issue for the utility.",
            "scenario_name": "EV Charging Locations Disclosed via Utility Database",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to hack a protocol translation module that translates demand response messages to an electric vehicle, from the Open Automated Demand Response protocol (OpenADR) as used by the utility, to Smart Energy Profile (SEP) 2.0 as used by the vehicle. Consequently, the agent is able to send any desired command to a vehicle or possibly to a large number of vehicles.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET5",
            "scenario_impact": "Potential for turning charging on or off for a large number of vehicles within a short time period, Inconvenience to customers, Cost of customer service situations, Potential to overpower and damage transformer in a neighborhood.",
            "scenario_name": "Compromised Protocol Translation Module Enables Control of EVs",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Although this is not currently done, an EVSE in the future may connect wirelessly to a meter for identifying the meter to be responsible for the charge. The EVSE attaches to the incorrect meter. This causes the wrong entity to be billed for any vehicle using the misconfigured EVSE.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET6",
            "scenario_impact": "Cost of billing disputes that could be raised by any customer, Delay or loss of payment to the utility, Likely cost to upgrade or replace the smart meter and/or EVSE.",
            "scenario_name": "EVSE Connects Wirelessly to Wrong Meter and Compromises Billing",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Private information exchanged between an EV and an EVSE is captured by a threat agent. For example, this might be information related to the EV owner\u2019s payment method, current location or home location. Such data exchanges are not currently done but are anticipated in the future.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET7",
            "scenario_impact": "Loss of customer privacy, Decreased acceptance of electric vehicles.",
            "scenario_name": "Private Information Disclosed in Transit between EV and EVSE",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "In a utility service territory where EVs are given preferential or special rates for electricity, a customer may misuse their EV registration identifier to power other electrical devices from the EVSE, thus getting that preferential rate for non-EV uses. In the case of Society of Automotive Engineers (SAE) J1772, the EV responds to the EVSE by clamping a 12V pulse width modulation (PWM) signal to either 3, 6, or 9 volts, depending on its status. A threat agent could plug a non-EV load into the EVSE and mimic the signal by using off-the-shelf resistors and diodes.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET8",
            "scenario_impact": "Loss of revenue to a utility, The non-EV load may draw too much current and blow the fuse of the EVSE or trip the local circuit breaker.",
            "scenario_name": "Customer Misuses their EV Registration ID to Obtain Preferential Rate",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "EV registration identities are stolen and used directly by the thief, or bought and sold in the black market so that they can be used to obtain preferential rates. This is of concern to a utility when the ID is used to identify the customer\u2019s payment method and/or the ID is used to charge a non-EV.",
            "scenario_domain_id": "ET",
            "scenario_domain_name": "Electric Transportation",
            "scenario_id": "ET9",
            "scenario_impact": "Illegitimate charges billed to legitimate owner of the EV registration ID, Cost of associated customer service situation for this owner, Likely loss of revenue by the utility.",
            "scenario_name": "EV Registration ID Stolen or Purchased to Obtain Preferential Rate",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Generation": [
        {
            "scenario_description": "A threat agent gains physical access to a river water pump house, connects a laptop to the local controls network, and adds a time-delay trip to the circulating water pumps triggered off of a normal value. This causes loss of cooling water flow resulting in the loss of condenser vacuum tripping the turbine and causing the plant to be tripped off line.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN1",
            "scenario_impact": "Inadequate cooling water to the condenser will lead to a loss of vacuum that will trip the turbine, Improper cooling water levels could damage the condenser and turbine, Lost generation, Time and expense to diagnose the problem, Plant thermal cycle gives greater opportunity for boiler tube leak.",
            "scenario_name": "Threat agent adds spurious trip parameters on remotely located",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Combined voice and data communication lines between the system operating center (also known as \u201cdispatch\u201d or generation controls center) that regulates the plant output are maintained by the phone company. The lines are clearly marked as being dedicated for this purpose to ensure that phone repair technicians take special care around these lines. The utility uses the existing system and does not encrypt the data. A threat agent gains physical access to these lines and connects them to their own networking components to allow for remote access \u2013 setting up a man-in-the.middle attack. The threat agent sends erroneous signals to the plant to rapidly cut back on power output during a period of high load on the grid. Insufficient power and high load leads to grid instability.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN10",
            "scenario_impact": ". The magnitude depends on grid conditions at the time (e.g., brownout, rolling blackout, etc.).",
            "scenario_name": "Threat agent causes grid instability through control of dedicated data",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A stable build of the DCS software was released. Several months later, the Distributed Control System (DCS) software is upgraded during a planned outage as suggested by the vendor. The upgrade process is lengthy and a number of security-related patches for the operating system were available to be installed. The decision is made to install older patches but delay installing the most recent patches to get the DCS operational and get the plant on-line. During the update process for the older patches, a technician uses an infected USB/laptop device on a computer in the DCS network. The malware exploits a vulnerability that was addressed in a recent patch that was not installed. The malware then spreads to the HMI stations interrupting communications through excessive network traffic impacting the control system processors. This delays the startup until the malware can be removed, the system can be patched, and the DCS reconfigured.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN11",
            "scenario_impact": ". Outage extended past the original plan leading to lost generation revenue.",
            "scenario_name": "Outage extended due to DCS HMI being disabled from malware",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to gain access to the corporate chemical inventory process control system by exploiting a known vulnerability that has not yet been patched. Once the threat agent is able to access the chemical inventory process control system, the threat agent is able to adjust the inventory levels preventing needed chemicals from being ordered.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN12",
            "scenario_impact": ". Potential impact on production depending on the chemicals that are missing when needed.",
            "scenario_name": "Chemical inventory process control system not properly patched",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An authorized user with the appropriate credentials is bribed or coerced by a threat agent to expose operational data on a dozen generation facilities through the M&D Center. The user collects information on the previous day\u2019s operation, critical equipment status, and operational plans \u2013 including outage schedule -for the upcoming week. The authorized user sends the data to the threat agent via e-mail. The threat agent then uses the information to inform competitors bidding into the power market.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN13",
            "scenario_impact": ". Utility loss of revenue due to disadvantage in bidding into power markets.",
            "scenario_name": "Utility competitor gains advantage using Monitoring & Diagnostic (M&D) center to gain sensitive information on upcoming generation availability",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A criminal threat agent is able to gain access to the Microwave Communication used for the long-distance communication among the plant switchyard assets, transformer telemetry, and the system operator constituting a Wide Area Network (WAN) of system interconnects. The threat agent has acquired the equipment needed to receive and transmit microwave communications. By establishing a line-of.sight position with the plant communication tower the agent is able to intercept information from over-the-air communications. These communications include substation telemetry and plant status information and can be used to control system response to interconnects. The threat agent determines the location needed to access the system to monitor critical communications of plant and switchyard status. Though a man-in-the-middle attack, the threat agent is able to send erroneous messages that generate a transformer fault. This, in turn, prompts automatic protective actions to open breakers isolating the main transformer. This disconnects the plant from the grid taking the unit offline and making the generation asset unavailable to the wider system.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN14",
            "scenario_impact": "Loss of Generation by separating the plant from system, System reliability is challenged by the unauthorized disconnection.",
            "scenario_name": "Generation assets taken off line by disrupted microwave communications",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The threat agent, a disgruntled vendor employee, uses the authorization credentials and verification procedure to a secure remote maintenance solution. The remote access solution involves a vendor-maintained asset on the DCS network that prompts the utility to grant the asset access to the DCS network. In addition to the prompt, the procedure requires a separate call from the vendor to the utility describing the need to remotely connect before the utility will complete the connection. The threat agent claims the need to collect routine system performance information. The utility connects the vendor maintained computer to the DCS network, giving the threat agent access. The payload delivered by the threat agent is a modified system file that starts polling networked assets sending commands that cause a flood of traffic in the DCS network. The commands overwhelm the processing ability of the network causing loss of DCS control of the plant. On loss of plant control the assigned operator initiates an immediate unit trip.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN15",
            "scenario_impact": "Affected assets will have to be restored and verified operational, Trips result in costs to restart the unit and to purchase replacement power. An unexpected and sudden trips challenge grid stability at the moment that the plant is taken offline, Any unexpected plant trip stresses the major plant components (generator, turbine, and boiler) leading to a reduction in the expected life of the components and a greater possibility of damage when the unit restarts.",
            "scenario_name": "Plant tripped off-line through access gained through a compromised vendor remote connection",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The physical attack is preceded by a cyber attack using malware to indicate false current/voltage transformer (CT/VT) readings. The malware\u2019s intent in generating these readings is to falsely indicate the existence of 3 phase shorts7 on one or more transmission facilities. The goal of the cyber attack is to create conditions that lead to unnecessary automated responses by select transmission protection equipment. The desired effect of these responses is to cause protection relays to open and close breakers in a manner that results in grid instability leading to the shutdown of electricity generation serving the grid segment under attack. The physical portion of the attack consists of destroying navigation locks or water level control gates on one or more hydroelectric units designated as \u201cblack-start\u201d facilities. Destruction of the locks or gates results in the loss of water containment. While water volumes behind the generating units remain sufficient for black-start power generation, the force of water movement past the damaged locks or gates will hinder repairs. By the time the water levels have receded to a point which allows repair, the levels will likely be too low to support the level of power generation needed to conduct normal black-start operations. The results of the attack may be extended depending upon the time needed to raise the water to a level sufficient for power generation",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN16",
            "scenario_impact": "7 http://www.engineering.schneider-electric.dk/Attachments/ed/guide/protection_guide_mv.pdf, Page 52. Affected assets will have to be restored and verified operational, Time and expense to diagnose the problem, The magnitude depends on grid conditions at the time (e.g., brownout, rolling blackout, etc.).",
            "scenario_name": "Black-Start Disruption",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An employee that has access to a laptop with the configuration files for the fuel handling programmable logic controllers makes accidental changes to parameters that affect the logic for disabling the main conveyor on plugged fuel chutes at a key transfer point. These changes will go unnoticed until the next time the laptop is used to load the configuration into the networked programmable logic controllers. Once the altered parameters are loaded \u2013 the conveyor continues to run even when the chute is plugged. This will continue until the control logic can be reconfigured and verified. When the chute is plugged, coal will begin to pile up quickly and spill.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN2",
            "scenario_impact": "Resources required to diagnose and repair the control logic, Coal falling from high elevation can damage equipment and endanger personnel, If the logic is not repaired in time, the plant\u2019s generation would be compromised.",
            "scenario_name": "Fuel handling system inoperable after incorrect programmable logic controller motor start parameters are loaded from corrupted reference configuration",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A representative of a vendor contracted to manage inventory and chemistry within the generation plant has remote, logical access through an insecure cellular connection. Remote access grants configuration control to the storage tank level instrumentation signals, day tank levels, and pump settings. A threat agent utilizes the cellular connection to access the system and modify the level indication causing the tanks to be overfilled with hazardous chemicals.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN3",
            "scenario_impact": "Hazardous chemical spills of any size are reportable to environmental authorities, Personnel and equipment are endangered by the uncontrolled hazardous chemical release, Impact may continue even after the laptop is retrieved if a copy of the laptop\u2019s operating system and/or applications can be exfiltrated or recreated by the threat agent.",
            "scenario_name": "Threat actor causes chemical spill using vendor remote access",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A technician installing replacement relays in a switchyard encounters an error on a generator protection relay that has remote access enabled. The technician \u2013 unfamiliar with this error -engages a public Internet message board to get diagnostic information for the relay. A threat agent -posing as an expert on the message board \u2013 targets the technician with a spear phishing attack to gain credentials necessary for remote access. The threat agent then acquires access to the generator protection relay and changes the configuration causing it to not open when appropriate. The failure of the protective relay to disconnect keeps the generator tied to the grid during a plant shutdown. This \u201cmotors\u201d the generator and significantly damages the generator and keeps the plant off-line until the generator can be repaired off-site.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN4",
            "scenario_impact": "Damage to the generator, Loss of revenue affected generating units until generator can be repaired which is usually performed off-site, Depending on generating contracts, cost of replacement power while unit is out.",
            "scenario_name": "Protective disconnect relays disabled on switchgear damaging",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A malicious technician within the company contracted to monitor and service the fire protection system on the plants substations installs a leave behind wireless network device during periodic maintenance. Using remote access and control of the system, the technician then alters the system settings, specifically, blocking the logic that generates fire alarms on the fire panel in the Main Control Rooms so no alarms are received in the control room. The technician then provides a false fire detection signal to the system. The fire signal activates the deluge system on the main turbine. This causes damage to the main turbine. The plant trips offline and the main turbine is disabled. [Note: For systems which only operate during emergencies, but which could damage or incapacitate equipment if caused to operate spuriously, it would seem prudent to periodically verify setpoints and control configurations.]",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN5",
            "scenario_impact": "Units served by the fire protection system will trip offline resulting in associated costs to restart the unit and to purchase replacement power and challenges grid stability at the moment that the plant is taken offline, Any unexpected plant trip stresses the major plant components (generator, turbine and boiler) leading to a reduction in the expected life of the components and a greater possibility of damage when the unit restarts, Long term down time of plant if damage to transformer is severe because of long lead time of new equipment.",
            "scenario_name": "Main transformer is out-of-service after being damaged through deluge system being remotely activated",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A vendor is onsite and updating an HMI for the precipitator and installs software using a USB drive that is infected with malware. The malware disables the HMI for the precipitator, consequently disabling the local control capabilities for the precipitator. The loss of control can result in an environmental violation and will require the system to be restored. Restoration of the system may require that the precipitator be taken off line.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN6",
            "scenario_impact": "Cost in diagnosis and system reconfiguration and testing, Potential environmental violation, Potential for propagation to other systems",
            "scenario_name": "Precipitator HMI interface disabled through malware introduced",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A vendor technician performs maintenance on the Programmable Logic Controller that controls the Ammonia Distribution system for the Selective Catalytic Reduction System (SCR). The technician installs malware-corrupted firmware \u2013 either inadvertently or maliciously -into the programmable logic controller when making the repairs. The malware executes when the unit is at full power and shuts the ammonia injection down. This causes the NOx discharge to continue to trend up above the permitted limit. Operations takes action to reduce power to limit the NOx discharge. A forced derate is put in place, but NOx continues to rise. Finally, the decision is made to remove the unit from service to troubleshoot the problem.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN7",
            "scenario_impact": "Fines from unexpected emission exceedance leading to violation of environmental license, Stricter emissions parameters by environmental regulator, Unit derate resulting in loss of revenue until the utility can satisfy regulatory requirements related to incident, The abrupt shutdown of the SCR system stresses the components of the system and increases the likelihood of equipment damage.",
            "scenario_name": "Hijacked Selective Catalytic Reduction System (SCR) is disabled",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A technician leaves their laptop \u2013 previously infected by a virus \u2013 connected to the DCS network to run a diagnostic on smart valves. The laptop is connected to both the centralized remote monitoring system and the plant controls system, because the laptop remains connected to the corporate wireless network. The virus propagates to other computers on the system and starts polling networked assets sending commands that cause a flood of traffic in the DCS network and the centralized remote monitoring system. The commands overwhelm the processing ability of the network causing a logical failure and triggering a shutdown of the plant.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN8",
            "scenario_impact": "Infected assets will have to be cleaned and verified to be virus-free and \u2013 in some cases \u2013 reconfigured and verified operational, Any unexpected plant trip stresses the major plant components (generator, turbine, and boiler) leading to a reduction in the expected life of the components and a greater possibility of damage when the unit restarts.",
            "scenario_name": "Plant tripped off-line through access gained through improperly",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "The Continuous Emissions Monitoring System (CEMS) is configured for a connection to the plant control system and a remote connection to allow remote monitoring by the vendor. A threat agent launches a spearphishing attack that is successful with one connected user. The threat agent uses the acquired credentials to access the CEMS to modify the control signal to provide false information to both the remote monitoring center and the control room. The false control signal shows a lower emission point giving the plant indication to cut back on emissions control. The lower control increases the actual emissions above the allowable rates set in the air permit. The situation persists long enough to lead to a violation of the plant emissions permit.",
            "scenario_domain_id": "GEN",
            "scenario_domain_name": "Generation",
            "scenario_id": "GEN9",
            "scenario_impact": "Unexpected exceedance on the plants environmental emissions leads to violation of environmental license with the regulator and subsequent fines, Stricter emissions parameters are specified by the environmental department, Bad press for the utility because environmental incidents are public record.",
            "scenario_name": "Failure of continuous emission monitoring systems (CEMS) leads to",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Generic": [
        {
            "scenario_description": "Authorized personnel -who may be operators, engineering staff or administrators, become active threat agents with legitimate access to IT, field systems, and/or control networks.",
            "scenario_domain_id": "Generic",
            "scenario_domain_name": "Generic",
            "scenario_id": "Generic1",
            "scenario_impact": ". Authorized personnel with legitimate access can inflict significant damage on a system either intentionally or by mistake. The impact for this scenario could range from a minor system being offline to a widespread outage of unknown duration.",
            "scenario_name": "Malicious and Non-malicious Insiders Pose Range of Threats",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent compromises an asset that has access to the Internet via the \u201cbusiness\u201d network. The asset on the business network also has access to a control system asset or network. The compromise of the business network asset provides a pivot point for the threat agent to gain control of a control system asset or network.",
            "scenario_domain_id": "Generic",
            "scenario_domain_name": "Generic",
            "scenario_id": "Generic2",
            "scenario_impact": ". The impact for this scenario could range from a minor system being offline to a widespread outage of unknown duration.",
            "scenario_name": "Inadequate Network Segregation Enables Access for Threat Agents",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent introduces counterfeit firmware or software, a virus, or malware via removable media to obtain partial or total control of a device or networked system.",
            "scenario_domain_id": "Generic",
            "scenario_domain_name": "Generic",
            "scenario_id": "Generic3",
            "scenario_impact": ". The impact for this scenario could range from a minor system being offline to a widespread outage of unknown duration.",
            "scenario_name": "Portable Media Enables Access Despite Network Controls",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An adversary replaces a legitimate device with a maliciously altered device and introduces the device into the supply chain without directly compromising a manufacturing entity. This can be done by buying a legitimate device, buying or creating a malicious device and returning the malicious device in place of the legitimate device as an exchange. Alteration may be a modification or deletion of existing functions or addition of unexpected functions.",
            "scenario_domain_id": "Generic",
            "scenario_domain_name": "Generic",
            "scenario_id": "Generic4",
            "scenario_impact": ". Depending on the level of sophistication of the threat agent, this scenario can result in the complete loss of confidentiality, integrity, and availability of systems using equipment from an infiltrated supply chain.",
            "scenario_name": "Supply Chain Attacks Weaken Trust in Equipment",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ],
    "Wide Area Monitoring, Protection, and Control": [
        {
            "scenario_description": "A set of Phasor Measurement Units (PMUs) receive their time via network communication from a Precision Time Protocol (PTP) server. A threat agent is able to perform a denial of service attack against PTP either by leveraging vulnerabilities in the PTP service itself or by flooding it with high volume of traffic or malformed packets targeting open ports that are not required by PTP. This leads to delays or lack of functionality of the PTP service, translating into the inability of the PMUs to correctly timestamp their measurements.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC1",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by loss of measurements due to lack of time synchronization.",
            "scenario_name": "Denial of Service Attack Impairs PTP Service",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent is able to gain unauthorized access to the credentials of the PMU/PDC/Phasor Gateway metadata that describes the data structure, assuming credentials are in place, and corrupts or deletes the associated metadata from the database.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC10",
            "scenario_impact": "All impacts presented in Table 6, as potentially caused by altered measurements, Significant effort/cost invested in troubleshooting the systems given the inconsistencies in PMU data attribution.",
            "scenario_name": "Compromised PMU/PDC/Phasor Gateway Metadata",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An insider delays local measurement data exchange between substations by compromising the integrity of the WAMPAC communication link between substations. This might be done by attacking network components such as routers, or gaining access to the network and employing a flooding attack. NOTE: The impact of the failure scenario presented below is assessed under the assumption that WAMPAC is used as part of a special protection scheme (SPS).",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC11",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by altered measurements or loss of data, for Special Protection and Control applications.",
            "scenario_name": "Compromised Communications between Substations",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An attacker blocks or alters the GPS time signal that is associated with the synchrophasor measurements. The attacker can perform either a GPS spoofing or GPS jamming attack, where the GPS receiver is deceived by a more powerful signal resulting in the GPS signal being intentionally blocked or altered.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC12",
            "scenario_impact": "All impacts presented in Table 6, as potentially caused by altered measurements (in the case of GPS spoofing) or loss of measurements (in the case of GPS jamming), Significant effort/cost invested in troubleshooting the systems given the lack of time signal consistency.",
            "scenario_name": "GPS Time Signal Compromise",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent leverages vulnerabilities to perform a spoofing attack and inject messages in WAMPAC network equipment (router, switch, etc.). The altered messages might be either measurements used as input to the WAMPAC algorithms, or commands to phasor measurement units (PMUs) or phasor data concentrators (PDCs).",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC2",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by altered measurements or loss of measurements.",
            "scenario_name": "Network Equipment used to Spoof WAMPAC Messages",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An insider is able to gain access to the network to which a PDC is connected and to the PDC\u2019s credentials, assuming credentials are in place. This individual compromises (malicious intent) or misconfigures (accidentally) the PDC. Consequently, the PDC does not recognize certain PDCs/PMUs and sends incomplete measurement data up in the WAMPAC hierarchy.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC3",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by loss of measurements.",
            "scenario_name": "Improper PDC Configuration Interferes with Transmission of Measurement Data",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "Although access control and connection authentication from a PMU into a PDC are in place, these are compromised. This may be due to a backdoor not subject to the usual controls, social engineering, network sniffing to gain credentials or an attack on the authentication database to modify or steal credential information. This allows inadvertent or malicious introduction of false measurement data.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC4",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by altered measurements.",
            "scenario_name": "Measurement Data Compromised due to PDC Authentication Compromise",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An authorized or unauthorized insider (e.g., social-engineered by a threat agent or accidentally) is able to gain access and misconfigures a phasor gateway, allowing less synchrophasor measurement data to be shared with other phasor gateways or altering the tagging of PMU ID associated with the shared data. This action results in a delay in other utilities\u2019 visibility to a cascading failure across utilities.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC5",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by altered data or loss of data, for Special Protection applications.",
            "scenario_name": "Improper Phasor Gateway Configuration Obscures Cascading Failures",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "WAMPAC communications are slowed down or stopped by manipulating the communications link between the PMUs and the control center. This might be done by attacking network components such as routers, or gaining access to the network and employing a flooding attack.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC6",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by loss of measurements.",
            "scenario_name": "Compromised Communications between PMUs and Control Center",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "An insider is able to gain unauthorized access to the network to which a WAMPAC historian is connected and to the historian host/database software\u2019s credentials, assuming credentials are in place. The insider corrupts or deletes the measurement data from the database. NOTE: The impact of the failure scenario presented below is assessed under the assumption that WAMPAC is using the long term historical data for forensic analysis and the short term historical data for can be used for damping oscillations (in minutes) or voltage/frequency stability (in seconds).",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC7",
            "scenario_impact": ". All impacts presented in Table 6, as potentially caused by loss of data, for Monitoring and Control applications.",
            "scenario_name": "Compromised WAMPAC Historical Data Impacts Grid Stability",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "A threat agent inserts firmware into PMU/PDC that alters measurements while they are collected. The altering mechanism can be triggered at all times, randomly or by certain events (e.g., time of day, certain date, etc.) that are assumed to inflict significant damage.",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC8",
            "scenario_impact": "All impacts presented in Table 6, as potentially caused by altered measurements, Significant effort/cost invested in troubleshooting the systems given the lack of measurement consistency, followed by equipment replacement.",
            "scenario_name": "Malware in PMU/PDC Firmware Compromises Data Collection",
            "scenario_source": "NECRO Failure Scenarios 2012"
        },
        {
            "scenario_description": "DELETED",
            "scenario_domain_id": "WAMPAC",
            "scenario_domain_name": "Wide Area Monitoring, Protection, and Control",
            "scenario_id": "WAMPAC9",
            "scenario_impact": "DELETED",
            "scenario_name": "DELETED",
            "scenario_source": "NECRO Failure Scenarios 2012"
        }
    ]
}

export default domainToScenarios;