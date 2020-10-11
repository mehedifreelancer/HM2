$('ul.expandible').each(function(){
    var $ul = $(this),
        $lis = $ul.find('li:gt(3)'),
        isExpanded = $ul.hasClass('expanded');
    $lis[isExpanded ? 'show' : 'hide']();
    
    if($lis.length > 0){
        $ul
            .append($('<span class="showmore"><li class="expand">' + (isExpanded ? 'Show Less' : 'Show More') + '</li></span>')
            .click(function(event){
                var isExpanded = $ul.hasClass('expanded');
                event.preventDefault();
                $(this).html(isExpanded ? 'Show More' : 'Show Less');
                $ul.toggleClass('expanded');
                $lis.toggle();
            }));
    }
});


