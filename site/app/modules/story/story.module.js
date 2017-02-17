angular
	.module("story", ["imagePicker"])
	.run(["$rootScope", function($rootScope) {

		$rootScope.types = {
			story: Story.type,
			metadata: Metadata.type,			
			content: Content.type,
			scene: Scene.type,
			end: End.type,
			choice: Choice.type,
			subscene: Subscene.type,
			narrator: Narrator.type,
			character: Character.type,
			speech: Speech.type,
			emotion: Emotion.type,
		};
	}]);