$(document).ready(() => {
    $('.del').on('click', deleteMember);
});
    
function deleteMember() { 

    var confirmation = confirm("Are you sure?");
    
    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/'+$(this).data('id')
        }).done((response) => {
            window.location.replace('/');
        });
    } else {
        return false;
    }
    
};
