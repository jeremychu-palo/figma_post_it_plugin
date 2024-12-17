This is the schema for the JSON format for sticky notes:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "key_features": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "text": { "type": "string" }
        },
        "required": ["title", "text"]
      }
    },
    "desired_outcomes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "text": { "type": "string" }
        },
        "required": ["title", "text"]
      }
    },
    "technical_requirements": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "text": { "type": "string" }
        },
        "required": ["title", "text"]
      }
    },
    "target_users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "text": { "type": "string" }
        },
        "required": ["title", "text"]
      }
    }
  },
  "required": ["key_features", "desired_outcomes", "technical_requirements", "target_users"]
}


The is an example of the JSON:
{
  "key_features": [
    {
      "title": "AI-Powered Recommendations",
      "text": "Utilize machine learning to provide personalized content suggestions"
    },
    {
      "title": "Real-Time Collaboration",
      "text": "Enable multiple users to work on the same project simultaneously"
    }
  ],
  "desired_outcomes": [
    {
      "title": "Increased User Engagement",
      "text": "Boost daily active users by 30% within 6 months"
    },
    {
      "title": "Improved Productivity",
      "text": "Reduce project completion time by 25% for teams using the platform"
    }
  ],
  "technical_requirements": [
    {
      "title": "Scalable Architecture",
      "text": "Design system to handle up to 1 million concurrent users"
    },
    {
      "title": "Cross-Platform Compatibility",
      "text": "Ensure seamless functionality across web, iOS, and Android devices"
    }
  ],
  "target_users": [
    {
      "title": "Creative Professionals",
      "text": "Designers, artists, and content creators aged 25-45"
    },
    {
      "title": "Small Business Owners",
      "text": "Entrepreneurs managing teams of 5-50 employees"
    }
  ]
}
