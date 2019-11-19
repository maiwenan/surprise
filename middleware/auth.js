import { getToken } from '~/utils/auth'

export default function({ redirect }) {
  if (!getToken()) {
    return redirect('/')
  }
}
