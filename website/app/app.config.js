angular
.module("resourceForceAuthoringTool")
.constant('config', {
    content : {
        regions: {
            "Lancashire" : ["English"],
            "LondonMetDemo" : ["English"],
            "CityOfLondon": ["English"]
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
            {id: -3, name: "Very Bad"},
            {id: -2, name: "Bad"},
            {id: -1, name: "Not Ok"},
            {id: 0,  name: "Neutral"},
            {id: 1,  name: "Ok"}, 
            {id: 2,  name: "Good"},
            {id: 3,  name: "Very Good"},
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