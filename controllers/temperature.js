module.exports.add = async function(req, res) {
    console.log('temperature add');
    // TODO add to db
    res.send(`temperature add ${new Date().toISOString()}`)
  }
