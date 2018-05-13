import { Injectable } from '@angular/core';
import { Http,Response, Headers,RequestMethod, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map';
import {AppSettings} from '../app.module';
@Injectable()
export class DataService {



  URLServeur=AppSettings.URLServeur;
  URLServeurSMTP=AppSettings.URLServeurSMTP;
  URLServeurKys=AppSettings.URLServeurKys;
  URLServeurCodeBar=AppSettings.URLServeurCodeBar;
  URLServeurSMTPevenement=AppSettings.URLServeurSMTPevenement;
  URLServeurSMTPcoli=AppSettings.URLServeurSMTPcoli;
  URLServeurSMTPincident=AppSettings.URLServeurSMTPincident;
  URLServeurSMTPraportClient=AppSettings.URLServeurSMTPraportClient;
  URLServeurInjectionUser=AppSettings.URLServeurInjectionUser;
  URLServeurSMTPsendmail=AppSettings.URLServeurSMTPsendmail;

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });


  private headers1 = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options1 = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  addBanqueKYS(banque): Observable<any> {
    return this.http.post(this.URLServeurKys+"/kyc/bank", JSON.stringify(banque), this.options).map(res => res.json()).catch(this.handleError);
  }

  addCompteKYS(compte): Observable<any> {
    return this.http.post(this.URLServeurKys+"/kyc/customer", JSON.stringify(compte), this.options).map(res => res.json()).catch(this.handleError);
  }
  addBanque(banque): Observable<any> {
    return this.http.post(this.URLServeur+"/banque", JSON.stringify(banque), this.options);
  }

  getBanqueDemande(): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getBanqueDemande').map(res => res.json()).catch(this.handleError);
  }

  getBanqueValide(): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getBanqueValide').map(res => res.json()).catch(this.handleError);
  }

  editBanque(banque): Observable<any> {
    return this.http.put(this.URLServeur+`/banque/${banque._id}`, JSON.stringify(banque), this.options);
  }


  getListeAgentDemande(): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getListeAgentDemande').map(res => res.json()).catch(this.handleError);
  }

  getListeAgentCompte(): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getListeAgentCompte').map(res => res.json()).catch(this.handleError);
  }

  getUsers(): Observable<any> {
  // return null;
  return this.http.get(this.URLServeur+'/users').map(res => res.json()).catch(this.handleError);
}

  getUsersAgentsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersAgentsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }



  gettypesitesByName(name): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/typesitesByName/'+name).map(res => res.json()).catch(this.handleError);
  }

  gettypesitesById(id): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/typesitesById/'+id).map(res => res.json()).catch(this.handleError);
  }

  getUsersByMail(email): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersByMail/'+email).map(res => res.json()).catch(this.handleError);
  }


  getUsersClientsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersClientsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersContactsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersContactsBySite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsBySite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getUsersContactsBySiteIncident(idSite,incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsBySiteIncident/'+idSite+'/'+incident).map(res => res.json()).catch(this.handleError);
  }
  getUsersContactsByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersContactsByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  addContact(user): Observable<any> {
    return this.http.post(this.URLServeur+"/contact", JSON.stringify(user), this.options);
  }
  editContact(user): Observable<any> {
    return this.http.put(this.URLServeur+`/contact/${user._id}`, JSON.stringify(user), this.options);
  }

  getListeContactByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/getContactsAgentsByidSite/'+idSite).map(res => res.json()).catch(this.handleError);
  }




  getUsersPermanentsByAgence(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersPermanentsByAgence/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersPermanentsBySite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersPermanentsBySite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getUsersPermanentsActifBySite(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersPermanentsActifBySite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getUsersPermanentsBySiteIncident(idSite,incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersPermanentsBySiteIncident/'+idSite+'/'+incident).map(res => res.json()).catch(this.handleError);
  }
  getUsersPermanentsByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersPermanentsByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  addPermanent(user): Observable<any> {
    return this.http.post(this.URLServeur+"/permanent", JSON.stringify(user), this.options);
  }
  editPermanent(user): Observable<any> {
    return this.http.put(this.URLServeur+`/permanent/${user._id}`, JSON.stringify(user), this.options);
  }

  getListePermanentByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/getPermanentsAgentsByidSite/'+idSite).map(res => res.json()).catch(this.handleError);
  }




  getUsersAgentsByAgenceNonAffecter(idAgence): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersAgentsByAgenceNonAffecter/'+idAgence).map(res => res.json()).catch(this.handleError);
  }

  getUsersByid(id): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersByid/'+id).map(res => res.json()).catch(this.handleError);
  }
  getUsersByIdAgence(id): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getUsersByIdAgence/'+id).map(res => res.json()).catch(this.handleError);
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

        return this.http.get(this.URLServeur+'/sitesByAgence/'+user.idAgence).map(res => res.json()).catch(this.handleError);
    }
  }


  getSitesByIdChef(): Observable<any> {

  var user=JSON.parse(localStorage.getItem('User'));
  return this.http.get(this.URLServeur+'/sitesByIdChef/'+user._id).map(res => res.json()).catch(this.handleError);


}



  getlistechef(): Observable<any> {


    return this.http.get(this.URLServeur+'/listechef').map(res => res.json()).catch(this.handleError);


  }
  getSitesById(id): Observable<any> {


    return this.http.get(this.URLServeur+'/siteById/'+id).map(res => res.json()).catch(this.handleError);

  }


  getSitesByIdAgent(): Observable<any> {

    var user=JSON.parse(localStorage.getItem('User'));
    return this.http.get(this.URLServeur+'/listeSitebyidAgent/'+user._id).map(res => res.json()).catch(this.handleError);

  }

  getSitesByIdClient(): Observable<any> {

    var user=JSON.parse(localStorage.getItem('User'));
    return this.http.get(this.URLServeur+'/sitesByIdClient/'+user._id).map(res => res.json()).catch(this.handleError);

  }

  getSitesByIdAgence(): Observable<any> {

    var user=JSON.parse(localStorage.getItem('User'));
    return this.http.get(this.URLServeur+'/sitesByIdAgence/'+user.idAgence).map(res => res.json()).catch(this.handleError);

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
  editSite(site): Observable<any> {
    return this.http.put(this.URLServeur+`/site/${site._id}`, JSON.stringify(site), this.options);
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

  editZone(zone): Observable<any> {
    return this.http.put(this.URLServeur+`/zone/${zone._id}`, JSON.stringify(zone), this.options);
  }


  addShift(shift): Observable<any> {
    return this.http.post(this.URLServeur+"/shift", JSON.stringify(shift), this.options);
  }
  getShifts(shift): Observable<any> {

    return this.http.get(this.URLServeur+'/shiftsBySite/'+shift._id).map(res => res.json()).catch(this.handleError);

  }
  deleteShift(shift): Observable<any> {
    return this.http.delete(this.URLServeur+`/shift/${shift._id}`, this.options);
  }

  editShift(shift): Observable<any> {
    return this.http.put(this.URLServeur+`/shift/${shift._id}`, JSON.stringify(shift), this.options);
  }

  deleteCle(cle): Observable<any> {
    return this.http.delete(this.URLServeur+`/cle/${cle._id}`, this.options);
  }

  addTypeincidents(incident): Observable<any> {
    return this.http.post(this.URLServeur+"/typeincident", JSON.stringify(incident), this.options);
  }
  deleteTypeincidents(incident): Observable<any> {
    return this.http.delete(this.URLServeur+`/typeincident/${incident._id}`, this.options);
  }
  editTypeincidents(incident): Observable<any> {
    return this.http.put(this.URLServeur+`/typeincident/${incident._id}`, JSON.stringify(incident), this.options);
  }
  getTypeincidents(incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/typeincidents').map(res => res.json()).catch(this.handleError);
  }

  getActionsTypeincidentsByName(incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/getActionsTypeincidentsByName/${incident}`).map(res => res.json()).catch(this.handleError);
  }

  getTypeincidentsByArray(incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/getTypeincidentsByArray/${incident}`).map(res => res.json()).catch(this.handleError);
  }


  addElementsronde(elementsronde): Observable<any> {
    return this.http.post(this.URLServeur+"/elementsronde", JSON.stringify(elementsronde), this.options);
  }

  deleteElementsronde(elementsronde): Observable<any> {
    return this.http.delete(this.URLServeur+`/elementsronde/${elementsronde._id}`, this.options);
  }

  editElementsronde(elementsronde): Observable<any> {
    return this.http.put(this.URLServeur+`/elementsronde/${elementsronde._id}`, JSON.stringify(elementsronde), this.options);
  }

  getElementsronde(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/elementsronde/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getActionsElementsrondeByType(elementsronde,idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getActionselementsrondeByType/'+elementsronde+'/'+idSite).map(res => res.json()).catch(this.handleError);


  }


  getActionsElementsrondeByTypeAndZone(idSite,type,zone): Observable<any> {
    // return null;
    var obj = { "idSite":idSite, "type":type, "zone":zone};

    return this.http.post(this.URLServeur+"/getActionselementsrondeByTypeAndZone", JSON.stringify(obj), this.options);
   // return this.http.get(this.URLServeur+'/getActionselementsrondeByTypeAndZone/'+idSite+'/'+type+'/'+zone).map(res => res.json()).catch(this.handleError);

    //return this.http.post(this.URLServeur+"/addCommentaire", JSON.stringify(commentaire), this.options);

  }

  getActionsElementsrondeByName(elementsronde): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/getActionsElementsrondeByName/${elementsronde}`).map(res => res.json()).catch(this.handleError);
  }

  getElementsrondeByArray(elementsronde): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/getElementsrondeByArray/${elementsronde}`).map(res => res.json()).catch(this.handleError);
  }


  addAlerts(alert): Observable<any> {
    return this.http.post(this.URLServeur+"/addalerts", JSON.stringify(alert), this.options);
  }
  getAlertsBySiteAgentNonLue(idSite,idAgent): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getAlertsBySiteAgentNonLue/'+idSite+'/'+idAgent).map(res => res.json()).catch(this.handleError);
  }

  editAlerts(alert): Observable<any> {
    return this.http.put(this.URLServeur+`/editalerts/${alert._id}`, JSON.stringify(alert), this.options);
  }



  addPosteAgent(incident): Observable<any> {
    return this.http.post(this.URLServeur+"/posteagent", JSON.stringify(incident), this.options);
  }
  deletePosteAgent(incident): Observable<any> {
    return this.http.delete(this.URLServeur+`/posteagent/${incident._id}`, this.options);
  }
  editPosteagent(incident): Observable<any> {
    return this.http.put(this.URLServeur+`/posteagent/${incident._id}`, JSON.stringify(incident), this.options);
  }
  getPostesagents(idSite): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/postesagents/${idSite}`).map(res => res.json()).catch(this.handleError);
  }

  getActionsPostesagentsByName(incident): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+`/getActionsPostesagentsByName/${incident}`).map(res => res.json()).catch(this.handleError);
  }


  addTypeSite(type): Observable<any> {
    return this.http.post(this.URLServeur+"/typesite", JSON.stringify(type), this.options);
  }
  deleteTypeSite(type): Observable<any> {
    return this.http.delete(this.URLServeur+`/typesite/${type._id}`, this.options);
  }
  editTypeSite(type): Observable<any> {
    return this.http.put(this.URLServeur+`/typesite/${type._id}`, JSON.stringify(type), this.options);
  }
  getTypeSites(type): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/typesites').map(res => res.json()).catch(this.handleError);
  }


  addTypeMatrielle(type): Observable<any> {
    return this.http.post(this.URLServeur+"/typematrielle", JSON.stringify(type), this.options);
  }
  deleteTypeMatrielle(type): Observable<any> {
    return this.http.delete(this.URLServeur+`/typematrielle/${type._id}`, this.options);
  }
  editTypeMatrielle(type): Observable<any> {
    return this.http.put(this.URLServeur+`/typematrielle/${type._id}`, JSON.stringify(type), this.options);
  }
  getTypeMatrielles(): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/typematrielles').map(res => res.json()).catch(this.handleError);
  }



  sendMail(email): Observable<any> {



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

  sendRapport(rep): Observable<any> {



    let body = JSON.stringify(rep);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });

    let url =this.URLServeurSMTPraportClient;



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




  sendMailColi(email): Observable<any> {



    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurSMTPcoli;


    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);


  }

  sendMailIncident(email): Observable<any> {



    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurSMTPincident;


    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);


  }


  sendMailMessageri(email): Observable<any> {

    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurSMTPsendmail;


    return this.http.post(url,body , "")
      .map(response => response.json()).catch(this.handleError);


  }

  sendListeUsers(listeusers): Observable<any> {



    let body = JSON.stringify(listeusers);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurInjectionUser;


    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);


  }

  generationCodeBar(object): Observable<any> {

    let body = JSON.stringify(object);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });

    let url =this.URLServeurCodeBar;



    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);




  }


  deleteCat(cat): Observable<any> {
    return this.http.delete(this.URLServeur+`/cat/${cat._id}`, this.options);
  }

  addAgentSite(user): Observable<any> {
    return this.http.post(this.URLServeur+"/siteagents", JSON.stringify(user), this.options);
  }

  getListeAgentAndChefByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/listeagentandchefbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }



  getListeAgentByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/listeagentbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }

  getListeChefByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/listeChefbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }


  deleteAgentSite(agent): Observable<any> {
    return this.http.post(this.URLServeur+`/deleteagentsite`, agent, this.options);
  }

  editAgentSite(agent): Observable<any> {
    return this.http.put(this.URLServeur+`/siteagent/${agent._id}`, JSON.stringify(agent), this.options);
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

  getAccesInByIdSite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesInBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getAccesAgentsByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getAccesAgentsByIdSite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesagentsBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourdate(site,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourdate/'+site._id+'/'+date).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourdateShift(site,date,debut,fin): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourdateShift/'+site._id+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);

  }
  getAccesByIdSiteJourdateDebutdateFin(site,datedebut,datefin): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourdatedebutdatefin/'+site._id+'/'+datedebut+'/'+datefin).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourEtatType(site,type,etat): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourEtatType/'+site._id+'/'+etat+'/'+type).map(res => res.json()).catch(this.handleError);

  }

  getAccesAgentByIdSiteJourEtatType(site,type,etat): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesAgentBySiteJourEtatType/'+site._id+'/'+etat+'/'+type).map(res => res.json()).catch(this.handleError);

  }

  getAccesAgentByIdSiteEtatType(site,type,etat): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesAgentBySiteEtatType/'+site._id+'/'+etat+'/'+type).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourEtat(site,etat): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourEtat/'+site._id+'/'+etat).map(res => res.json()).catch(this.handleError);

  }

  getAccesByIdSiteJourEntres(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteJourEntres/'+site._id).map(res => res.json()).catch(this.handleError);
  }

  getAccesByIdSiteEntres(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesBySiteEntres/'+site._id).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentsByIdSiteJourEntres(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJourEntres/'+site._id).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentsByIdSiteIdAgentJourEntres(site,idAgent): Observable<any> {

    //return this.http.get(this.URLServeur+'/getAccesagentsBySiteIdAgentJourEntres/'+site._id+'/'+idAgent).map(res => res.json()).catch(this.handleError);
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteIdAgentEntres/'+site._id+'/'+idAgent).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentsByIdSiteIdAgentEntres(site,idAgent): Observable<any> {

    return this.http.get(this.URLServeur+'/getAccesagentsBySiteIdAgentEntres/'+site._id+'/'+idAgent).map(res => res.json()).catch(this.handleError);
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

  getHoriquereservationsInBySite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsInBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  gethoriquereservationsByIdSiteJourIdResIdMat(site,idRes,idMat): Observable<any> {

    return this.http.get(this.URLServeur+'/gethoriquereservationsByIdSiteJourIdResIdMat/'+site._id+'/'+idRes+'/'+idMat).map(res => res.json()).catch(this.handleError);

  }

  gethoriquereservationsAgentByIdSite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsAgentBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  gethoriquereservationsAgentByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsAgentBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }



  gethoriquereservationsByIdSiteJourdate(site,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteJourdate/'+site._id+'/'+date).map(res => res.json()).catch(this.handleError);

  }


  gethoriquereservationsByIdSiteJourdateShift(site,date,debut,fin): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteJourdateShift/'+site._id+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);

  }
  gethoriquereservationsByIdSiteJourEtatTypeTypeUser(site,etat,type,typeUser): Observable<any> {

  return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteJourEtatTypeTypeUser/'+site._id+"/"+etat+'/'+type+'/'+typeUser).map(res => res.json()).catch(this.handleError);

}

  gethoriquereservationsByIdSiteEtatTypeTypeUser(site,etat,type,typeUser): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteEtatTypeTypeUser/'+site._id+"/"+etat+'/'+type+'/'+typeUser).map(res => res.json()).catch(this.handleError);

  }

  gethoriquereservationsByIdSiteJourEtatType(site,etat,type): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteJourEtatType/'+site._id+"/"+etat+'/'+type).map(res => res.json()).catch(this.handleError);

  }

  gethoriquereservationsByIdSiteEtatType(site,etat,type): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsBySiteEtatType/'+site._id+"/"+etat+'/'+type).map(res => res.json()).catch(this.handleError);

  }
  gethoriquereservationsById(acce): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsById/'+acce._id).map(res => res.json()).catch(this.handleError);

  }


  getHoriquereservationsByIdEtatIn(acce): Observable<any> {

    return this.http.get(this.URLServeur+'/getHoriquereservationsByIdEtatIn/'+acce._id).map(res => res.json()).catch(this.handleError);

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

  getAccesAgentByIdSiteIdAgent(agent): Observable<any> {
    return this.http.post(this.URLServeur+"/getAccesBySiteIdAgent", JSON.stringify(agent), this.options).map(res => res.json());
  }

  getAccesAgentByIdSiteJourIdAgentEtatIn(idsite,idAgent): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesAgentByIdSiteJourIdAgentEtatIn/'+idsite+'/'+idAgent).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentByIdSiteJour(site): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentByIdSiteJourdate(site,date): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJourdate/'+site._id+'/'+date).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentByIdSiteJourdateRep(site,date): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJourdateRep/'+site._id+'/'+date).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentByIdSiteJourdateRepShift(site,date,debut,fin): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJourdateRepSift/'+site._id+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);
  }

  getAccesAgentByIdSiteJourShift(site,date,debut,fin,idShift): Observable<any> {
    return this.http.get(this.URLServeur+'/getAccesagentsBySiteJourShift/'+site._id+'/'+date+'/'+debut+'/'+fin+'/'+idShift).map(res => res.json()).catch(this.handleError);
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

  getRondeByIdSiteJourDate(site,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getRondesBySiteJourDate/'+site._id+'/'+date).map(res => res.json()).catch(this.handleError);

  }

  getRondeByIdSiteJourDateShift(site,date,debut,fin): Observable<any> {

    return this.http.get(this.URLServeur+'/getRondesBySiteJourDateShift/'+site._id+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);

  }

  getAllRonde(): Observable<any> {

    return this.http.get(this.URLServeur+'/getrondes').map(res => res.json()).catch(this.handleError);

  }


  editRonde(ronde): Observable<any> {
    return this.http.put(this.URLServeur+`/rondes/${ronde._id}`, JSON.stringify(ronde), this.options);
  }


  addConsigne(consine): Observable<any> {
    return this.http.post(this.URLServeur+"/addconsigne", JSON.stringify(consine), this.options);
  }

  editConsigne(consigne): Observable<any> {
    return this.http.put(this.URLServeur+`/consigne/${consigne._id}`, JSON.stringify(consigne), this.options);
  }

  addEvenement(evenement): Observable<any> {

    return this.http.post(this.URLServeur+"/addEvenement", JSON.stringify(evenement), this.options);
  }

  editEvenement(evenement): Observable<any> {
    return this.http.put(this.URLServeur+`/evenement/${evenement._id}`, JSON.stringify(evenement), this.options);
  }

  sendMailEvenement(email): Observable<any> {



    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurSMTPevenement;


    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);


  }

  getEvenementByIdSiteDate(idSite,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getEvenementbyidsitedate/'+idSite+'/'+date).map(res => res.json()).catch(this.handleError);
  }

  getEvenementByIdSiteDateShift(idSite,date,debut,fin): Observable<any> {

    return this.http.get(this.URLServeur+'/getEvenementbyidsitedateSift/'+idSite+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);
  }

  getEvenementByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getEvenementsBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }


  getAllEvenement(): Observable<any> {

    return this.http.get(this.URLServeur+'/getEvenement').map(res => res.json()).catch(this.handleError);

  }

  deleteEvenement(evenement): Observable<any> {
    return this.http.delete(this.URLServeur+`/evenement/${evenement._id}`, this.options);
  }


  addCommentaire(commentaire): Observable<any> {

    return this.http.post(this.URLServeur+"/addCommentaire", JSON.stringify(commentaire), this.options);
  }

  editCommentaire(commentaire): Observable<any> {
    return this.http.put(this.URLServeur+`/commentaire/${commentaire._id}`, JSON.stringify(commentaire), this.options);
  }

  sendMailCommentaire(email): Observable<any> {



    let body = JSON.stringify(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method: RequestMethod.Post, });
    let url =this.URLServeurSMTPevenement;


    return this.http.post(url,body , options)
      .map(response => response.json()).catch(this.handleError);


  }

  getCommentaireByIdSiteDate(idSite,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getCommentairebyidsitedate/'+idSite+'/'+date).map(res => res.json()).catch(this.handleError);
  }

  getCommentaireByIdSiteDateShift(idSite,date,debut,fin): Observable<any> {

    return this.http.get(this.URLServeur+'/getCommentairebyidsitedateSift/'+idSite+'/'+date+'/'+debut+'/'+fin).map(res => res.json()).catch(this.handleError);
  }

  getCommentaireByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getCommentairesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }


  getAllCommentaire(): Observable<any> {

    return this.http.get(this.URLServeur+'/getCommentaire').map(res => res.json()).catch(this.handleError);

  }

  deleteCommentaire(commentaire): Observable<any> {
    return this.http.delete(this.URLServeur+`/commentaire/${commentaire._id}`, this.options);
  }


  deleteConsigne(consine): Observable<any> {
    return this.http.delete(this.URLServeur+`/consine/${consine._id}`, this.options);
  }

  getConsigneByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getConsignesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getNewConsigneByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getNewConsignesBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getConsigneByIdSiteCalander(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getConsignesBySiteCalander/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getConsigneByIdSite(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getConsignesBySite/'+site._id).map(res => res.json()).catch(this.handleError);

  }





  addProcedure(procedure): Observable<any> {
    return this.http.post(this.URLServeur+"/addProcedure", JSON.stringify(procedure), this.options);
  }

  editProcedure(procedure): Observable<any> {
    return this.http.put(this.URLServeur+`/procedure/${procedure._id}`, JSON.stringify(procedure), this.options);
  }

  deleteProcedure(procedure): Observable<any> {
    return this.http.delete(this.URLServeur+`/procedure/${procedure._id}`, this.options);
  }

  getProcedureByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getProceduresBySiteJour/'+site._id).map(res => res.json()).catch(this.handleError);
  }


  getProcedureByIdSiteJourActif(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getProceduresBySiteJourActif/'+site._id).map(res => res.json()).catch(this.handleError);
  }


  addIncident(incident): Observable<any> {
    return this.http.post(this.URLServeur+"/incident", JSON.stringify(incident), this.options);
  }

  getIncidentByIdSite(idSite): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsite/'+idSite).map(res => res.json()).catch(this.handleError);
  }
  getIncidentByIdSiteDate(idSite,date): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsitedate/'+idSite+'/'+date).map(res => res.json()).catch(this.handleError);
  }

  getIncidentByIdSiteDateDebutDateFin(idSite,dateDebut,dateFin): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsitedatedebutdatefin/'+idSite+'/'+dateDebut+'/'+dateFin).map(res => res.json()).catch(this.handleError);
  }

  getIncidentByIdSiteDateDebutDateFinName(idSite,dateDebut,dateFin,name): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsitedatedebutdatefinname/'+idSite+'/'+dateDebut+'/'+dateFin+'/'+name).map(res => res.json()).catch(this.handleError);
  }

  getIncidentByIdSiteDateDebutDateFinNameZone(idSite,dateDebut,dateFin,name,zone): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsitedatedebutdatefinnameZone/'+idSite+'/'+dateDebut+'/'+dateFin+'/'+name+'/'+zone).map(res => res.json()).catch(this.handleError);
  }

  getIncidentByIdSiteAnnee(idSite,annee): Observable<any> {

    return this.http.get(this.URLServeur+'/getincidentbyidsiteannee/'+idSite+'/'+annee).map(res => res.json()).catch(this.handleError);
  }



  getIncidentsByIdSiteJour(site): Observable<any> {

    return this.http.get(this.URLServeur+'/getIncidentbyidsiteJour/'+site._id).map(res => res.json()).catch(this.handleError);

  }

  getIncidentsByIdSiteJourType(site,type): Observable<any> {

    return this.http.get(this.URLServeur+'/getIncidentbyidsiteJourType/'+site._id+'/'+type).map(res => res.json()).catch(this.handleError);

  }

  addMessage(message): Observable<any> {
    return this.http.post(this.URLServeur+"/message", JSON.stringify(message), this.options);
  }

  editMessage(msg): Observable<any> {
    return this.http.put(this.URLServeur+`/message/${msg._id}`, JSON.stringify(msg), this.options);
  }

  getListeMessageInByMail(mail,page): Observable<any> {

  return this.http.get(this.URLServeur+'/getListeMessageInByMail/'+mail+'/'+page).map(res => res.json()).catch(this.handleError);
}

  getListeMessageInByMailSearch(mail,search,page): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeMessageInByMailSearch/'+mail+'/'+search+'/'+page).map(res => res.json()).catch(this.handleError);
  }

  getListeMessageOutByMailSearch(mail,search,page): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeMessageOutByMailSearch/'+mail+'/'+search+'/'+page).map(res => res.json()).catch(this.handleError);
  }

  getListeMessageRepInByMail(mail,id,page): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeMessageRepInByMail/'+mail+'/'+id+'/'+page).map(res => res.json()).catch(this.handleError);
  }

  getListeMessageOUTByMail(mail,page): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeMessageOUTByMail/'+mail+'/'+page).map(res => res.json()).catch(this.handleError);
  }

  getListeMessageInByMailNonLue(mail): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeMessageInByMailNonLue/'+mail).map(res => res.json()).catch(this.handleError);
  }


  getnbrMessageInByMail(mail): Observable<any> {

    return this.http.get(this.URLServeur+'/getnbrMessageInByMail/'+mail).map(res => res.json()).catch(this.handleError);
  }

  deleteMessage(mail): Observable<any> {
    return this.http.delete(this.URLServeur+`/message/${mail._id}`, this.options);
  }


  getListeChatInByMailNonLue(mail): Observable<any> {

    return this.http.get(this.URLServeur+'/getListechatInByIdNonLue/'+mail).map(res => res.json()).catch(this.handleError);
  }
  getListeChatInById(id): Observable<any> {

    return this.http.get(this.URLServeur+'/getListechatInById/'+id).map(res => res.json()).catch(this.handleError);
  }


  addChat(message): Observable<any> {
    return this.http.post(this.URLServeur+"/chat", JSON.stringify(message), this.options);
  }

  editChat(msg): Observable<any> {
    return this.http.put(this.URLServeur+`/chat/${msg._id}`, JSON.stringify(msg), this.options);
  }

  getListeChatInByIdUsers(idUser,idUserChat): Observable<any> {

    return this.http.get(this.URLServeur+'/getListeChatInByIdUsers/'+idUser+'/'+idUserChat).map(res => res.json()).catch(this.handleError);
  }

  addRapport(rapport): Observable<any> {
    return this.http.post(this.URLServeur+"/addRapport", JSON.stringify(rapport), this.options);
  }


  addColis(coli): Observable<any> {
    return this.http.post(this.URLServeur+"/coli", JSON.stringify(coli), this.options);
  }

  getColisBySite(id): Observable<any> {
    // return null;
    return this.http.get(this.URLServeur+'/getColisBySite/'+id).map(res => res.json()).catch(this.handleError);
  }

  editColi(coli): Observable<any> {
    return this.http.put(this.URLServeur+`/coli/${coli._id}`, JSON.stringify(coli), this.options);
  }



   handleError (error: Response | any) {

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
