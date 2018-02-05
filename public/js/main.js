'use strict';

$(document).ready(function(){
        var user,pass;
        $("#submitLogin").click(function(){
          user=$("input[name='username']").val();
          pass=$("input[name='password']").val();
          $.post("http://localhost:3000/login",{user: user,password: pass}, function(data){
            
              $('#result').html(data);
              
          });
          
        });

        $("#submitCreate").click(function(){          
          user=$("input[name='username']").val();
          pass=$("input[name='password']").val();        
          $.post("http://localhost:3000/register",{user: user,password: pass}, function(data){
            
              $('#result').html(data);
              
          });
        });
      });

        $('.register-form').hide(); 
        $('.login-form').show();

        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"});
          });


