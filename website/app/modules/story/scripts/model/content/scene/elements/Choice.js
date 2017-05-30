class Choice {
	constructor(title, description, severity, officerReq, turnReq, satisfactionImpact) {
		var self = this;

		self._type = "Choice";
		self.title = title;
		self.description = description;
		self.severity = severity;
		self.officerReq = officerReq;
		self.turnReq = turnReq;
		self.satisfactionImpact = satisfactionImpact;
		
		self.action = new Subscene();		
		self.scene = new Scene();

		self.action.action = new ChoiceAction();
	}
}