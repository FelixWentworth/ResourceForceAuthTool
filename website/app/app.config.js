angular
.module("resourceForceAuthoringTool")
.constant('config', {
    content : {
        regions: {
            "Belfast" : ["English"],
            "Groningen" : ["English", "Dutch"],
            "Preston" : ["English"],
            "Nicosia" : ["English", "Greek"],
            "Valencia" : ["English", "Spanish"],
            "Lancashire" : ["English"]
        },
        
        severity: [
            {id: 1, name: "Low"},
            {id: 2, name: "Medium"}, 
            {id: 3, name: "High"}
        ],
        officers: [1,2,3,4],
        turns: [1,2,3,4],
        feedback: [
            {id: 1, name: "Very Bad"},
            {id: 2, name: "Bad"}, 
            {id: 3, name: "Ok"},
            {id: 4, name: "Good"},
            {id: 5, name: "Very Good"}
        ],
        impact: [
            {id: -99, name: "None"},
            {id: -5, name: "Awful"},
            {id: -4, name: "Very Bad"}, 
            {id: -3, name: "Bad"},
            {id: -2, name: "Poor"},
            {id: -1, name: "Not Ok"},
            {id: 0,  name: "Neutral"},
            {id: 1,  name: "Ok"}, 
            {id: 2,  name: "Satisfactory"},
            {id: 3,  name: "Good"},
            {id: 4,  name: "Very Good"},
            {id: 5,  name: "Outstanding"},
        ]
    },
    constraints : {
        title : {
            min : 1,
            max : 50
        },
        description : {
            min : 10,
            max : 200
        },
        feedback : {
            min : 1,
            max : 100
        },
        comment : {
            min : 1,
            max : 200
        },
        reason : {
            min : 1,
            max : 200
        },
        depth : {
            min : 1,
            max : 5
        },
        minScenarios : 15
    }
});