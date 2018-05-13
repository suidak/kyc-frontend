

$(document).ready(function() {

  $('#example tfoot th').each( function () {
    var title = $(this).text();

    if(title!=""){

      $(this).html( '<input type="text" style=" width: 97%;" placeholder="Search '+title+'" />' );
    }else{
      $(this).html( '' );
    }

  } );

  $('#example1 tfoot th').each( function () {
    var title = $(this).text();

    if(title!=""){

      $(this).html( '<input type="text" style=" width: 97%;" placeholder="Search '+title+'" />' );
    }else{
      $(this).html( '' );
    }

  } );

  var table =  $('#example1').DataTable( {
    dom: 'Bfrtip',
    buttons: [ ]
  } );


  $('#example2 tfoot th').each( function () {
    var title = $(this).text();

    if(title!=""){

      $(this).html( '<input type="text" style=" width: 97%;" placeholder="Search '+title+'" />' );
    }else{
      $(this).html( '' );
    }

  } );

  var table =  $('#example2').DataTable( {
    dom: 'Bfrtip',
    buttons: [ ]
  } );

  var table =  $('#example').DataTable( {
    dom: 'Bfrtip',
    buttons: [ 'copy', 'csv', 'excel', 'print',
      {
        extend: 'pdfHtml5',


      }
      ]
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





} );






function HeureCheckEJS()
{
  if( document.getElementById("ejs_heure")){


    krucial = new Date;
    heure = krucial.getHours();
    min = krucial.getMinutes();
    sec = krucial.getSeconds();
    jour = krucial.getDate();
    mois = krucial.getMonth()+1;
    annee = krucial.getFullYear();
    if (sec < 10)
      sec0 = "0";
    else
      sec0 = "";
    if (min < 10)
      min0 = "0";
    else
      min0 = "";
    if (heure < 10)
      heure0 = "0";
    else
      heure0 = "";
    if (mois == 1)
      mois = "Janvier";
    if (mois == 2)
      mois = "Février";
    if (mois ==3)
      mois = "Mars";
    if (mois == 4)
      mois = "Avril";
    if (mois == 5)
      mois = "Mai";
    if (mois == 6)
      mois = "Juin";
    if (mois == 7)
      mois = "Juillet";
    if (mois == 8)
      mois = "Août";
    if (mois == 9)
      mois = "Septembre";
    if (mois == 10)
      mois = "Octobre";
    if (mois == 11)
      mois = "Novembre";
    if (mois == 12)
      mois = "Décembre";
    if (jour == 1)
      jour1 = "er";
    else
      jour1 = "";
    DinaHeure = "Il est " + heure0 + heure + "h" + min0 + min  + " et nous sommes le " + jour + jour1 + " " + mois + " " + annee + ".";
    DinaHeurehba = jour + jour1 + " " + mois + " " + annee + " " + heure0 + heure + "h" + min0 + min +" "+ sec0+sec;
    //alert(DinaHeure);

    which = DinaHeurehba
    if (document.getElementById){
      document.getElementById("ejs_heure").innerHTML=which;
    }
    setTimeout("HeureCheckEJS()", 1000)

  }
}
window.onload = HeureCheckEJS();
