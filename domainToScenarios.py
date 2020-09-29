import json

domainsToScenarios = {}

with open('sample.json') as f:
  data = json.load(f)["data"]
  for scenario in data:
      if "scenario_domain_name" in scenario:
        domain = scenario["scenario_domain_name"]
        if domain not in domainsToScenarios:
          domainsToScenarios[domain] = [scenario]
        else:
          domainsToScenarios[domain].append(scenario)
with open('domainToScenarios.json', 'w') as outfile:
    json.dump(domainsToScenarios, outfile)

#result: {'Generic', 'Wide Area Monitoring, Protection, and Control', 'Electric Transportation', 'Distributed Energy Resources', 'Distribution Grid Management', 'Demand Response', 'Advanced Metering Infrastructure', 'Generation'}