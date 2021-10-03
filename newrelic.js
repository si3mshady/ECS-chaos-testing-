'use strict'

exports.config = {

  app_name: ['New Relic Choas Tester'],
  
  license_key: '8755e018cdxxxxxx37697f9xxxxx61f13NRAL',
  
  distributed_tracing: {
   
    enabled: true
  },
  logging: {
   
    level: 'info'
  },
 
  allow_all_headers: true,
  attributes: {
    
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
