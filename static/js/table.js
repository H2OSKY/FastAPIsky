document.addEventListener("DOMContentLoaded", init);

function init() {
    const dataTable = new DataTable('#example', {
        lengthMenu: [5, 10, 30, 100],
        // dom: 'Blfrtip',
        // buttons: [
        //     'excel', 'pdf'
        // ]
    });
}
