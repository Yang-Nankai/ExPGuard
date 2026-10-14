const log = (data) => {

  if (DEBUG === false) {
    return;
  }

  console.log(data);
  console.trace();

}