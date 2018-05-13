/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var System: any;
declare var Auth0Lock: any;
declare var $ : any;
declare var html2canvas: any;
declare module 'socket.io-client' {
  var e: any;
  export = e;
}

