require('../Utilities/CustomLocators.js');

var HomePage=function(){

this.homeButton=$('button.home');
this.managerLoginButton=element(by.ngClick('manager()'));
this.pageHeader=$('.mainHeading');







};

module.exports=new HomePage();