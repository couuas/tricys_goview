// @ts-check
import storeGenerator from './store-template/prompt.js'

export default plop => {
  plop.setGenerator('store', storeGenerator)
}
