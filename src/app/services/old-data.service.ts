import { Injectable } from '@angular/core';
import { Http,Response, Headers,RequestMethod, RequestOptions } from '@angular/http';



import {Observable} from 'rxjs'
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  /*URLServeur="http://demo2.positiftunisie.com:3002";
URLServeurSMTP='http://demo2.positiftunisie.com/serveurMail/index.php';*/

  URLServeur="http://localhost:3000";
  URLServeurSMTP='http://localhost:80/serveurMail/index.php';

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });


  private headers1 = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options1 = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUsers(): Observable<any> {
  // return null;
  return this.http.get(this.URLServeur+'/users').map(res => res.json()).catch(this.handleError);
}

  getUsersAgentsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersAgentsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersClientsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersClientsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersContactsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersAgentsByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersAgentsByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersContactsByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getMaterielleByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getMaterielleByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getMaterielleByIdSiteNonAffecter(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getmateriellebyidsitenonaffecter/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getMaterielleByIdSite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getmateriellebyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getCleByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getCleByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getCleeByIdSite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getclebyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }
  getUserAdminActifNonEffect(){
    return this.http.get(this.URLServeur+'/useradminactifnoneffect').map(res => res.json()).catch(this.handleError);
  }

  getAgences(): Observable<any> {

    // return null;
    return this.http.get(this.URLServeur+'/agences').map(res => res.json()).catch(this.handleError);
  }

  editAgence(agence): Observable<any> {
    return this.http.put(this.URLServeur+`/agence/${agence._id}`, JSON.stringify(agence), this.options);
  }
  getClientss(): Observable<any> {

    // return null;
    return this.http.get('http://client.positif.lan/rest/client/get/id/9').map(res => res.json()).catch(this.handleError);
  }
  getSites(): Observable<any> {

    var user=JSON.parse(localStorage.getItem('User'));

    switch(user.typeUser) {
      case "SuperAdmin":
        return this.http.get(this.URLServeur+'/sites').map(res => res.json()).catch(this.handleError);

      case "Admin":
        console.log("sitesByAgence");
        return this.http.get(this.URLServeur+'/sitesByAgence/'+user.idAgence).map(res => res.json()).catch(this.handleError);



    }





  }

  getSiteByEmail(email): Observable<any> {

    return null;
   // return this.http.post('http://localhost:3000/getsitebyemail',JSON.stringify({'email':email}), this.options);
  }

  addAgence(agence): Observable<any> {
    return this.http.post(this.URLServeur+"/agence", JSON.stringify(agence), this.options);
  }

  addUser(user): Observable<any> {
    return this.http.post(this.URLServeur+"/user", JSON.stringify(user), this.options);
  }
  addContact(user): Observable<any> {
    return this.http.post(this.URLServeur+"/contact", JSON.stringify(user), this.options);
  }
  addMaterielle(materielle): Observable<any> {
    return this.http.post(this.URLServeur+"/materielle", JSON.stringify(materielle), this.options);
  }
  addCle(cle): Observable<any> {
    return this.http.post(this.URLServeur+"/cle", JSON.stringify(cle), this.options);
  }
  getMateriellesByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/materiellesByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }
  getClesByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/clesByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }
  getClesBysiteNonAffecter(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getclesbysitenonaffecter/'+idSite).map(res => res.json()).catch(this.handleError);
  }
  getCats(): Observable<any> {

  // return null;
  return this.http.get(this.URLServeur+'/cats').map(res => res.json()).catch(this.handleError);
  }
  addCat(cat): Observable<any> {
    return this.http.post(this.URLServeur+"/cat", JSON.stringify(cat), this.options);
  }
  editCat(cat): Observable<any> {
    return this.http.put(this.URLServeur+`/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }
  editUser(user): Observable<any> {
    return this.http.put(this.URLServeur+`/user/${user._id}`, JSON.stringify(user), this.options);
  }
  editMaterielle(materielle): Observable<any> {
    return this.http.put(this.URLServeur+`/materielle/${materielle._id}`, JSON.stringify(materielle), this.options);
  }
  editCle(cle): Observable<any> {
    return this.http.put(this.URLServeur+`/cle/${cle._id}`, JSON.stringify(cle), this.options);
  }
  addSite(site): Observable<any> {
    return this.http.post(this.URLServeur+"/site", JSON.stringify(site), this.options);
  }
  addZone(zone): Observable<any> {
    return this.http.post(this.URLServeur+"/zone", JSON.stringify(zone), this.options);
  }
  getZones(site): Observable<any> {

    return this.http.get(this.URLServeur+'/zonesBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }
  deleteZone(zone): Observable<any> {
    return this.http.delete(this.URLServeur+`/zone/${zone._id}`, this.options);
  }
  deleteCle(cle): Observable<any> {
    return this.http.delete(this.URLServeur+`/cle/${cle._id}`, this.options);
  }
  sendMail(email): Observable<any> {

console.log("sendMail"+JSON.stringify(email)+"--");

    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });

    let url =this.URLServeurSMTP;



    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);



    //*let headers = new Headers({ 'Content-Type': 'application/json','charset': 'UTF-8'  });
  /*  let options = new RequestOptions({method: RequestMethod.Post, headers: headers });
    let body = JSON.stringify([1,2,3]);
    //let url = 'http://localhost:80/webserviceAPP/index.php';
    let url = 'http://localhost/serveurMail/index.php';
    return this.http.post(url, body, this.options).map(res => res.json());*/


   // return this.http.post("http://localhost/serveurMail/index.php", JSON.stringify([1,2,3]), this.options);





  }
  deleteCat(cat): Observable<any> {
    return this.http.delete(this.URLServeur+`/cat/${cat._id}`, this.options);
  }

  addAgentSite(user): Observable<any> {
    return this.http.post(this.URLServeur+"/siteagents", JSON.stringify(user), this.options);
  }


  getListeAgentByIdSite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/listeagentbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  deleteAgentSite(agent): Observable<any> {
    return this.http.post(this.URLServeur+`/deleteagentsite`, agent, this.options);
  }

  addAcces(acce): Observable<any> {
    return this.http.post(this.URLServeur+"/addacce", JSON.stringify(acce), this.options);
  }
  getAccesByIdSite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }
  getAccesByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourEntres(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourEntres/'+site._id).map(res => res.json()).catch(this.handleError);
  }




  addhistoriquereservations(historique): Observable<any> {
    return this.http.post(this.URLServeur+"/addhistoriquereservations", JSON.stringify(historique), this.options);
  }

  deletethoriquereservations(historique): Observable<any> {
    return this.http.post(this.URLServeur+`/deletethoriquereservations`, historique, this.options);
  }

  gethoriquereservationsByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }
  gethoriquereservationsById(acce): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsById/'+acce._id).map(res => res.json()).catch(this.handleError);

  }

  editHoriquereservations(materielle): Observable<any> {
    return this.http.put(this.URLServeur+`/editHoriquereservations/${materielle._id}`, JSON.stringify(materielle), this.options);
  }
  editAcces(acce): Observable<any> {
    return this.http.put(this.URLServeur+`/editAcces/${acce._id}`, JSON.stringify(acce), this.options);
  }

  addAccesagents(acce): Observable<any> {
    return this.http.post(this.URLServeur+"/addacceagents", JSON.stringify(acce), this.options);
  }
  getAccesAgentByIdSiteIdAgentJour(agent): Observable<any> {
   return this.http.post(this.URLServeur+"/getAccesBySiteIdAgentJour", JSON.stringify(agent), this.options).map(res => res.json());
  }


  addRonde(ronde): Observable<any> {
    return this.http.post(this.URLServeur+"/addronde", JSON.stringify(ronde), this.options);
  }

  deleteRonde(ronde): Observable<any> {
    return this.http.delete(this.URLServeur+`/ronde/${ronde._id}`, this.options);
  }

  getRondeByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getRondesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }


  addConsigne(consine): Observable<any> {
    return this.http.post(this.URLServeur+"/addconsigne", JSON.stringify(consine), this.options);
  }

  deleteConsigne(consine): Observable<any> {
    return this.http.delete(this.URLServeur+`/consine/${consine._id}`, this.options);
  }

  getConsigneByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getConsignesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }


  addIncident(incident): Observable<any> {
    return this.http.post(this.URLServeur+"/incident", JSON.stringify(incident), this.options);
  }

  getIncidentByIdSite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getincidentbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }





}
