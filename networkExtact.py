import json

domains = []

with open('sample.json') as f:
  data = json.load(f)["data"]
  for scenario in data:
      if "scenario_domain_name" in scenario:
        domain = scenario["scenario_domain_name"]
        if domain not in domains:
          domains.append(domain)
with open('domains.json', 'w') as outfile:
    json.dump(domains, outfile)