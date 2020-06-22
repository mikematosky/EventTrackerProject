## Event Tracker Project

### Week 12-14 Project for Skill Distillery

[Hosted Live on AWS- (WEEK 13)](http://3.22.22.68:8080/BigGreen/api/waterings)


## Overview
* Lawncare Watering App
* An app to track the water intake of a lawn whether it's from rain or from a hose.

## Database Entity

![Watering Entity](https://github.com/mikematosky/EventTrackerProject/blob/master/watering_table.png)


## Example JSON

```
{
    "id": 10
    "date": "2020-06-07",
    "inches": 0.1,
    "duration": 0.15,
    "observations": "It drizzled",
    "rain": true
}
```


## API Endpoints
| Returns | Verb     | URI   | Description |
|---------|----------|-------|-------------|
| List&lt;Watering%gt; | GET | api/waterings | Retrieve list of **WATERING**s |
| Watering | GET | api/waterings/{id} | Retrieve one **WATERING** entry by id |
| Watering | POST | api/waterings | Creates a **WATERING** entry |
| Watering | PUT | api/waterings/{id} | Updates a **WATERING** entry |
| | DELETE | api/waterings/{id} | Deletes a **WATERING** entry |


## Default Inserts

![Waterings Data](https://github.com/mikematosky/EventTrackerProject/blob/master/waterings_inserts.png)


## Technologies Used
* MySQL, MySQL Workbench
* JPA/Hibernate
* Spring Boot
* Spring Data JPA
* Gradle
* RESTful Services
* Postman
* MAMP
* Git/Github
* AJAX

## Lessons Learned
* Incorporating a JPA repository
* Using a REST Service to access database objects
* Solidify understanding of HTTP Request and Responses for safe browsing
* Successful deployment to AWS
* Testing with Postman and JUnit 5
* JSON formatting for POST and PUT inputs
* More fancy markdown techniques for README
* Creating tables and forms using AJAX
* Adding EventListeners for Front-End Interactability
