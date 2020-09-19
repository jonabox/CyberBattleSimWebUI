export default
  {
    "attack_graph_details": [
      {
        "scenario_assumption": "Remote connections for vendor access are tightly controlled and physically disconnected when not in use, but inadvertent connections sometimes occur; DMS/SCADA network segregated from corporate, public networks, no air gap; Some DMS communications are run over leased fiber lines where some communication\u2019s equipment is shared with other entities; Electrical infrastructure information resides on corporate networks as well as the control network; Data logging is performed on DMS system, recording logins, breaker trips, capacitor bank switching, configuration changes, etc.; Intrusion detection systems are not present on DMS network; Some utility linemen and communication personnel carry laptops that permit connections to DMS/SCADA field equipment, communication devices, and the DMS system over the control system network; Moderate complexity password authentication, no two-factor authentication; Distribution communications do not employ encryption and defense in depth; DMS/SCADA system is monitored 24/7 by dedicated control personnel;Control system network is flat;Distribution system is largely radial with tie lines at the end of some laterals",
        "scenario_description": "A threat agent gains access to selected elements of the utility DMS system -which includes all distribution automation systems and equipment in control rooms, substations, and on pole tops - via remote connections. After gaining the required access, the threat agent manufactures an artificial cascade through sequential tripping of select critical feeders and components, causing automated tripping of generation sources due to power and voltage fluctuations. ",
        "scenario_domain_id": "DGM",
        "scenario_id": "DGM.11",
        "scenario_name": "Threat Agent Triggers Blackout via Remote Access to Distribution System"
      }
    ],
    "has_attack_graph": 1,
    "has_detail": 1,
    "has_mitigation": 11,
    "has_security_requirement": 5,
    "has_vulnerability": 7,
    "message": "Finish Fetching Scenario Detail Information",
    "mitigation_details": [
      {
        "action_application_context": "for company devices and systems",
        "action_common_category": "require strong passwords",
        "action_group": "secure operations",
        "action_type": "m",
        "id": 536,
        "original_mitigation": "Require strong passwords with complexity requirements on company devices and systems,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "to protect company information and documents from unauthorized disclosure",
        "action_common_category": "train personnel",
        "action_group": "train",
        "action_type": "m",
        "id": 537,
        "original_mitigation": "Protect company information and documents from unauthorized disclosure through training and implementing corporate policies on handling sensitive information. This includes one-lines, equipment information, communication architectures, protection schemes, load profiles, etc.,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "on handling sensitive information. This includes substation one-line diagrams, equipment information, communication architectures, protection schemes, load profiles, etc.",
        "action_common_category": "define policy",
        "action_group": "plan",
        "action_type": "m",
        "id": 538,
        "original_mitigation": "Protect company information and documents from unauthorized disclosure through training and implementing corporate policies on handling sensitive information. This includes one-lines, equipment information, communication architectures, protection schemes, load profiles, etc.,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "(operations and maintenance employees) to handle and protect company computing devices securely, incorporating two-factor authentication, requirements on storing devices, and reporting instructions in cases of loss or theft",
        "action_common_category": "train personnel",
        "action_group": "train",
        "action_type": "m",
        "id": 539,
        "original_mitigation": "Train operations and maintenance employees to handle and protect company computing devices securely, incorporating two-factor authentication, requirements on storing devices, and reporting instructions in cases of loss or theft,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "of all changes in HMI control actions",
        "action_common_category": "create audit log",
        "action_group": "audit",
        "action_type": "a",
        "id": 540,
        "original_mitigation": "Log and alert all changes in HMI control actions,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "for all changes in HMI control actions",
        "action_common_category": "generate alerts",
        "action_group": "alert",
        "action_type": "a",
        "id": 541,
        "original_mitigation": "Log and alert all changes in HMI control actions,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "of remote vendor connections (e.g. physically disconnect remote connections when not in use)",
        "action_common_category": "restrict remote access",
        "action_group": "control access",
        "action_type": "m",
        "id": 542,
        "original_mitigation": "Prohibit or restrict remote vendor connections (e.g. physically disconnect remote connections when not in use),",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "for distribution control communications",
        "action_common_category": "encrypt communication paths",
        "action_group": "encrypt",
        "action_type": "a",
        "id": 543,
        "original_mitigation": "Encrypt distribution control communications,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "for correct DMS configuration",
        "action_common_category": "require 2-person rule",
        "action_group": "verify",
        "action_type": "a",
        "id": 544,
        "original_mitigation": "Apply strict policy that requires two person verification of correct DMS configuration and keep configuration documents up to date,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "for configuration documents",
        "action_common_category": "implement configuration management",
        "action_group": "track",
        "action_type": "m",
        "id": 545,
        "original_mitigation": "Apply strict policy that requires two person verification of correct DMS configuration and keep configuration documents up to date,",
        "scenario_id": "dgm.11"
      },
      {
        "action_application_context": "(distribution control networks)",
        "action_common_category": "isolate networks",
        "action_group": "isolate",
        "action_type": "m",
        "id": 546,
        "original_mitigation": "Provide defense in depth by segmenting distribution control network.",
        "scenario_id": "dgm.11"
      }
    ],
    "security_requirement_details": [
      {
        "id": 308,
        "scenario_id": "DGM.11",
        "security_requirement_id": "SG.AC"
      },
      {
        "id": 309,
        "scenario_id": "DGM.11",
        "security_requirement_id": "SG.AT"
      },
      {
        "id": 310,
        "scenario_id": "DGM.11",
        "security_requirement_id": "SG.AU"
      },
      {
        "id": 311,
        "scenario_id": "DGM.11",
        "security_requirement_id": "SG.ID"
      },
      {
        "id": 312,
        "scenario_id": "DGM.11",
        "security_requirement_id": "SG.SC"
      }
    ],
    "status": 200,
    "vulnerability_details": [
      {
        "common_vulnerability": "physical access to mobile devices may enable logical access to business functions by unauthorized individuals",
        "id": 310,
        "original_vulnerability": "Inadequate protection of linemen and maintenance personnel company laptops used for remote connections from loss, theft, or abuse, and from misuse when not under control of authorized individuals,",
        "scenario_id": "dgm.11",
        "vulnerability_context": "specifically linemen and maintenance personnel company laptops used for remote connections,",
        "vulnerability_id": "Physical Access to the Device ",
        "vulnerability_name": "6.5.1.6"
      },
      {
        "common_vulnerability": "system relies on credentials that are easy to obtain for access",
        "id": 311,
        "original_vulnerability": "Lack of strong authentication on company computer,",
        "scenario_id": "dgm.11",
        "vulnerability_context": "to company computers,",
        "vulnerability_id": "Weaknesses in Authentication Process or Authentication Keys ",
        "vulnerability_name": "6.5.1.4"
      },
      {
        "common_vulnerability": "physical access may be obtained by unauthorized individuals",
        "id": 312,
        "original_vulnerability": "Weak protection of proprietary utility documents and information,",
        "scenario_id": "dgm.11",
        "vulnerability_context": "to proprietary utility documents and information,",
        "vulnerability_id": "Physical Access to the Device ",
        "vulnerability_name": "6.5.1.6"
      },
      {
        "common_vulnerability": "configuration changes are not verified for correctness",
        "id": 313,
        "original_vulnerability": "Inadequate measures to prevent and detect human error in data center configuration (e.g. Ethernet cable plugged into wrong port),",
        "scenario_id": "dgm.11",
        "vulnerability_context": "to prevent and detect human error in data center configuration (e.g. Ethernet cable plugged into wrong port),",
        "vulnerability_id": "Inadequate Change and Configuration Management ",
        "vulnerability_name": "6.2.2.5"
      },
      {
        "common_vulnerability": "system permits unauthorized changes",
        "id": 314,
        "original_vulnerability": "Allowing remote access for vendors to do application maintenance and troubleshooting,",
        "scenario_id": "dgm.11",
        "vulnerability_context": "by allowing remote access for vendors to do application maintenance and troubleshooting,",
        "vulnerability_id": "Inadequate Change and Configuration Management ",
        "vulnerability_name": "6.2.2.5"
      },
      {
        "common_vulnerability": "system makes messages accessible to unauthorized individuals",
        "id": 315,
        "original_vulnerability": "Unencrypted distribution control communications,",
        "scenario_id": "dgm.11",
        "vulnerability_context": "in the distribution control communication channel,",
        "vulnerability_id": "Use of Insecure Protocols ",
        "vulnerability_name": "6.3.1.21"
      },
      {
        "common_vulnerability": "system design limits opportunity for system recovery using reconfiguration",
        "id": 316,
        "original_vulnerability": "Distribution networks are more radial in nature than meshed, making network reconfiguration to restore power more difficult.",
        "scenario_id": "dgm.11",
        "vulnerability_context": "such as distribution networks that are more radial in nature than meshed, making network reconfiguration to restore power more difficult.",
        "vulnerability_id": "Business Logic Vulnerability ",
        "vulnerability_name": "6.3.1.8"
      }
    ]
  }
