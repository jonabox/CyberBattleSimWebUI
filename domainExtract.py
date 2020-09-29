import json

foundDomains = set()

with open('sample.json') as f:
  data = json.load(f)["data"]
  for scenario in data:
      if "scenario_domain_name" in scenario and scenario["scenario_domain_name"] not in foundDomains:
          foundDomains.add(scenario["scenario_domain_name"])
print(foundDomains)

#result: {'Generic', 'Wide Area Monitoring, Protection, and Control', 'Electric Transportation', 'Distributed Energy Resources', 'Distribution Grid Management', 'Demand Response', 'Advanced Metering Infrastructure', 'Generation'}