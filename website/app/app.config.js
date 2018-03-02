angular
.module("resourceForceAuthoringTool")
.constant('config', {
    content : {
        locations: ["Belfast", "Groningen", "Preston", "Nicosia", "Valencia"],
        languages: ["Dutch", "English", "Greek", "Spanish"],
        
        severity: [1,2,3],
        officers: [1,2,3,4],
        turns: [1,2,3,4],
        feedback: [1,2,3,4,5],
        impact: [-5,-4,-3,-2,-1,0,1,2,3,4,5]
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
        }
    }
});