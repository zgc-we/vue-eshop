import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('artist')
  }
}
