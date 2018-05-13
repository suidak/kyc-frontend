



  $('#example2 tfoot th').each( function () {
    var title = $(this).text();

    if(title!=""){

      $(this).html( '<input type="text" style=" width: 97%;" placeholder="Search '+title+'" />' );
    }else{
      $(this).html( 'action' );
    }

  } );

  var table =  $('#example2').DataTable( {
    dom: 'Bfrtip',
    buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print']
  } );

// Apply the search
  table.columns().every( function () {
    var that = this;

    $( 'input', this.footer() ).on( 'keyup change', function () {
      if ( that.search() !== this.value ) {
        that
          .search( this.value )
          .draw();
      }
    } );
  } );


