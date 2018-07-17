$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
        $("#button").click(function(){
                let uuid=generateUUID();
                let input = $(".input-text").val();
                if(input != "")
                {
                    let add ="<li id="+uuid+" class=''><input name='done-todo' type='checkbox' class='done-todo'>"+input+"</li>";
                    $("ol").append(add);
                }
        });
        $( "body" ).on( "click",".done-todo", function() {
            if($(this).parent().hasClass("checked")){
                $(this).parent().removeClass("checked");
            }else{
                $(this).parent().addClass("checked");
            }
        });

        $("a[data-filter='all']").click(function(){
            $("li").each.attr({ class: "checked"});
        });
    });