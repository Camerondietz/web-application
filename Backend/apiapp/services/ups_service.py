import requests
import os
import json

UPS_CLIENT_ID = os.getenv("UPS_CLIENT_ID")
UPS_CLIENT_SECRET = os.getenv("UPS_CLIENT_SECRET")

def get_access_token():
    print("getting token")
    url = "https://onlinetools.ups.com/security/v1/oauth/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials"
    }
    response = requests.post(url, headers=headers, data=data, auth=(UPS_CLIENT_ID, UPS_CLIENT_SECRET))
    print(response.json()["access_token"])
    response.raise_for_status()
    
    return response.json()["access_token"]

def get_shipping_rates(destination_zip: str, weight_lbs: float):
    token = get_access_token()
    print("Got token")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    # UPS requires weight in pounds, dimensions in inches
    data = {
        "RateRequest": {
            "Request": {
                "TransactionReference": {
                    "CustomerContext": "Rating and Service"
                }
            },
            "Shipment": {
                "Shipper": {
                    "Name": "AVENTREK",
                    "ShipperNumber": "01W91B",  # Required for negotiated rates
                    "Address": {
                        "AddressLine": ["12440 alameda trace circle"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": "78727",
                        "CountryCode": "US"
                    }
                },
                "ShipTo": {
                    "Name": "Customer",
                    "Address": {
                        "AddressLine": ["416 luna vista"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": destination_zip,
                        "CountryCode": "US"
                    }
                },
                "ShipFrom": {
                    "Name": "Your Company",
                    "Address": {
                        "AddressLine": ["12440 alameda trace circle"],
                        "City": "Austin",
                        "StateProvinceCode": "TX",
                        "PostalCode": "78727",
                        "CountryCode": "US"
                    }
                },
                "Package": [
                    {
                        "PackagingType": {
                            "Code": "02",  # Customer Supplied Package
                            "Description": "Package"
                        },
                        "Dimensions": {
                            "UnitOfMeasurement": {"Code": "IN"},
                            "Length": "10",
                            "Width": "8",
                            "Height": "4"
                        },
                        "PackageWeight": {
                            "UnitOfMeasurement": {"Code": "LBS"},
                            "Weight": str(weight_lbs)
                        }
                    }
                ]
            }
        }
    }

    url = "https://onlinetools.ups.com/api/rating/v2409/shop"
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    print(response)
    return response.json()
