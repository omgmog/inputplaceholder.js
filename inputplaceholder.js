(function($){
    /**
     * Brings placeholder text support to browsers that don't natively support placeholder text
     * 
     * Copyright 2012 Max Glenister
     *
     * Author: Max Glenister - github.com/omgmog
     */
    // if the browser natively support placeholder text, nothing to do here!
    if ( "placeholder" in document.createElement( "input" ) ) return;
    $(document).ready(function(){
        $("input[placeholder]").each(function(){
            var $a = $(this);
            var $apt = $a.attr("placeholder");
            if($a.is(':password')){
                $a.hide();
                var $ati = $a.attr("tabindex");
                var $aclass = $a.attr("class");
                var $aid = $a.attr("id");
                $('<input type="text" \
                    tabindex="'+($ati?$ati:'')+'" \
                    id="'+($aid?$aid:'')+'" \
                    class="placeholder '+($aclass?$aclass:'')+'" \
                    value="'+$apt+'" />').insertBefore($a);
                // if it's safe to assume that we won't have more than
                // one input[type='password'] in the same dom node
                $b = $a.siblings('.placeholder');
                $b.on('focus',function(){
                    $b.hide();
                    $a.show().focus();
                });
                $a.on('blur',function(){
                    if($a.val()===""||$a.val()===$apt){
                        $a.hide();
                        $b.show();
                    }
                });
            }else{
                if($a.val()=="") $a.val($apt);
                $a.on('focus',function(){
                    $a.val(($a.val()===$apt?'':$a.val()));
                });
                $a.on('blur',function(){
                    $a.val(($a.val()===""?$apt:$a.val()));
                });
            }
        });
    });
})(jQuery);