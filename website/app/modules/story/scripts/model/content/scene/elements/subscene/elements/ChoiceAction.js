class ChoiceAction {
	constructor (choiceType, feedbackRating, feedback) {
		var self = this;

		self._type = "ChoiceAction";

		self.ChoiceType = choiceType;
		self.FeedbackRating = feedbackRating;
		self.Feedback = feedback;
		
	}
}