class Choice {
	constructor() {
		var self = this;

		self._type = "Choice";
		self.action = new Subscene();		
		self.scene = new Scene();

		self.action.elements.push(new ChoiceAction());
	}
}