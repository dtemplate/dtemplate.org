declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: any;
    promise: any;
  };
  // eslint-disable-next-line no-var
  var _mongoClientPromise: any;
}
export {};
