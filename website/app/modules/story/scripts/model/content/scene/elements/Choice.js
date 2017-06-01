class Choice {
	constructor() {
		var self = this;

		self._type = "Choice";
		
		self.choice = new ChoiceAction();

		self.scene = new Scene();

		//self.action = new Subscene();		
		//self.action.action = new ChoiceAction();
	}
}