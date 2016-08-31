$.component("coral.formelement", {
	version: "4.0.2",
	options: {
	},
	getValidateValue: function() {
		return this.getValue();
	},
	clearError: function(){
		this.component().removeClass("hasErrorIcon coral-validate-error");
		this.component().find(".coral-errorIcon").remove();
		this.element.prop("isError", false);
	}
});