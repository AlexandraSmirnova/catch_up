define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
		el: $("#page"),
    	template: tmpl,
	
		events: {
            "submit #idFormSignin": "submitSignin",
            "click a": "hide"
		},

        render: function () {						
            $(this.el).html(this.template());																								 
            return this;
        },

		submitSignin: function(event) {
				
			if(validateForm()){
				$.ajax({
					type: "POST",
					url: "/api/v1/auth/signin",
					data: $(this).serialize(),
												 
					success: function(data){
						 window.location.replace("/#game");					
					}
				});
			}
			return false;

		},

        show: function () {
          	this.$el.render();
        },
        hide: function () {
             this.$el.empty();
        }

    });

	function validateForm(){
 		var valid = checkName() && checkPassword();
		if(!valid)
			$('.form-div_errors').css('display', 'block');		
        return valid;
    }

	function checkName(){
 		var userName = $("input[name = login]").val();
        if (userName == '') {
            $('.form-div_errors').text("Input your login, please!");
			return false;				
		}		
		return true;
	}
		
	function checkPassword(){
 		var userPassword = $("input[name = password]").val();
        if (userPassword == '') {
            $('.form-div_errors').text("Input your password, please!");
			return false;				
		}		
		return true;
	}
    return new View();
});
