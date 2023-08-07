import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate } from "react-router-dom"

const AccountPage = () => {
    const { ready, user } = useContext(UserContext)

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <nav className="w-full flex mt-8 justify-center gap-2">
                <Link className="py-2 px-6 bg-primary text-white rounded-full" to={'/account'}>My profile</Link>
                <Link className="py-2 px-6" to={'/account/bookings'}>My bookings</Link>
                <Link className="py-2 px-6" to={'/account/places'}>My accomodations</Link>
            </nav>
        </div>
    )
}

export default AccountPage