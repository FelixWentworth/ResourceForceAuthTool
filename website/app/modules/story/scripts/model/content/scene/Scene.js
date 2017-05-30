class Scene {
	constructor(title, description, severity, officerReq, turnReq, satisfactionImpact) {
		var self = this;

		self._type = "Scene";
		self.Title = title;
		self.Description = description;
		self.Severity = severity;
		self.OfficerReq = officerReq;
		self.TurnReq = turnReq;
		self.SatisfactionImpact = satisfactionImpact;

		self.Choices = [];
	}
}