import Navbar from '@/components/navbar'
import { SubscriptionEntitlementQuery } from '@/convex/query.config'
import { combinedSlug } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const { entitlement, profileName } = await SubscriptionEntitlementQuery();
    // if (!entitlement._valueJSON) {
    //     redirect(`/dashboard/${combinedSlug(profileName!)}`)
    // }
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout