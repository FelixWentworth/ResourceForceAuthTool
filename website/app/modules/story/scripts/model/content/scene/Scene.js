class Scene {
	constructor(title, description, severity, officerReq, turnReq, satisfactionImpact) {
		var self = this;

		self._type = "Scene";
		self.title = title;
		self.description = description;
		self.severity = severity;
		self.officerReq = officerReq;
		self.turnReq = turnReq;
		self.satisfactionImpact = satisfactionImpact;

		self.choices = [];
	}
}