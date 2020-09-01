const User = require('./User')

const user = {
  user_name: 'riceecir',
  password: '123456'
}

// 增加
const add = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}
// add()

// 查询
const query = async () => {
  const result = await User.find()
  console.log(result)
}
// query()

// 改
const update = async () => {
  const result = await User.updateOne({ user_name: 'riceecir2' }, {
    password: '4884848484'
  })
  console.log(result)
}
// update()

const del = async () => {
  const result = await User.deleteOne({ user_name: 'riceecir' })
  console.log(result)
}
// del()
