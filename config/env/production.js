export const secure = {
  ssl: process.env.HOST_SECURE || false,
  privateKey: './config/sslcerts/key.pem',
  certificate: './config/sslcerts/cert.pem',
  caBundle: './config/sslcerts/ca_bundle.crt'
};
export const port = process.env.PORT || 8443;
export const host = process.env.HOST || '0.0.0.0';
export const proxy = process.env.HTTP_PROXY || false;
export const splunkUrl = 'http://splunk.org:8088/services/collector';
export const splunkToken = 'replace-with-spunk';
export const mongoDB = {
  uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/snsjf_app',
  options: {
    /**
    * Uncomment to enable ssl certificate based authentication to mongodb
    * servers. Adjust the settings below for your specific certificate
    * setup.
    * for connect to a replicaset, rename server:{...} to replset:{...}
    ssl: true,
    sslValidate: false,
    checkServerIdentity: false,
    sslCA: fs.readFileSync('./config/sslcerts/ssl-ca.pem'),
    sslCert: fs.readFileSync('./config/sslcerts/ssl-cert.pem'),
    sslKey: fs.readFileSync('./config/sslcerts/ssl-key.pem'),
    sslPass: '1234'
    */
    useUnifiedTopology: true
  },
  // Enable mongoose debug mode
  debug: process.env.MONGODB_DEBUG || false
};
export const oracleDB = {
  // rms: {
  //     'connectString': process.env.DB_RMS_NAME,
  //     'user': process.env.DB_RMS_USER,
  //     'password': process.env.DB_RMS_PASS,
  //     'poolMin': 4,
  //     'poolMax': 30,
  //     'poolIncrement': 2,
  //     'poolTimeout': 120,
  //     'queueRequests': true,
  //     'queueTimeout': 0
  // },
};
export const mssqlDB = {
  // gppyrl: {
  //     'user': '',
  //     'password': '',
  //     'server': '',
  //     'database': '',
  //     'requestTimeout': 300000,
  //     'pool': {
  //         'max': 10,
  //         'min': 4,
  //         'idleTimeoutMillis': 30000
  //     },
  //     'options': {
  //         'useColumnNames': false
  //     }
  // }
};
export const log = {
  // logging with Morgan - https://github.com/expressjs/morgan
  // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
  format: process.env.LOG_FORMAT || 'combined',
  fileLogger: {
    directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
    fileName: process.env.LOG_FILE || 'app.log',
    maxsize: 10485760,
    maxFiles: 2
  }
};
export const ldap = {
  server: {
    url: process.env.LDAP_URL || 'ldap://localhost:389',
    bindDn: process.env.LDAP_DN || 'CN=LDAP1,OU=Service Accounts,OU=snsjf_app Users,DC=snsjf_app,DC=local',
    bindCredentials: process.env.LDAP_SECRET || 'LDAP_SECRET',
    searchBase: process.env.LDAP_SEARCH_BASE || 'DC=snsjf_app,DC=local',
    searchFilter: process.env.LDAP_SEARCH_FILTER || '(&(objectCategory=person)(objectClass=user)(|(sAMAccountName={{username}})(mail={{username}})))' // login with username or email
  }
};
export const google = {
  clientID: process.env.GOOGLE_ID || 'APP_ID',
  clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
  callbackURL: '/auth/google/callback'
};
export const github = {
  clientID: process.env.GITHUB_ID || 'APP_ID',
  clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
  callbackURL: '/auth/github/callback'
};
export const mailer = {
  test: process.env.MAILER_TEST || false,
  from: process.env.MAILER_FROM || '',
  options: {
    host: process.env.MAILER_HOST || '',
    service: process.env.MAILER_SERVICE_PROVIDER || '',
    port: process.env.MAILER_PORT || 587,
    auth: {
      user: process.env.MAILER_USER || '',
      pass: process.env.MAILER_SECRET || ''
    }
    //SNMP
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //     ciphers: 'SSLv3'
    //   }
  }
};
export const seedDB = {
  options: {
    logResults: process.env.MONGO_SEED_LOG_RESULTS || 'false'
  },
  // Order of collections in configuration will determine order of seeding.
  // i.e. given these settings, the Features seeds will be complete before
  // Roles seed is performed.
  collections: [{
    model: 'Features',
    docs: [{
      data: {
        name: 'UAC',
        route: '/uac',
        permissions: [{
          name: 'default'
        }],
        order_priority: 1
      }
    }]
  }, {
    model: 'Roles',
    docs: [{
      data: {
        name: 'admin',
        featurePermissions: ['uac:default']
      }
    }, {
      data: {
        name: 'user'
      }
    }]
  }, {
    model: 'User',
    docs: [{
      data: {
        username: 'local-admin',
        email: 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        roles: ['admin', 'user']
      }
    }]
  }]
};
