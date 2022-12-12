import { useEffect, useMemo, useState } from 'react'
import CLoading from 'common/components/CLoading'
import { getAllByHostId } from 'common/queries-fn/presentations.query'
import { FireIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import { PlayIcon, XMarkIcon } from '@heroicons/react/20/solid'

function MPresentationList() {
    //#region data
    const navigate = useNavigate()
    const localUser = JSON.parse(localStorage.getItem('user'))
    const { data, isLoading } = getAllByHostId(localUser.id)
    const presentations = useMemo(() => data?.data ?? [], [data])
    //#endregion

    //#endregion event
    if (!localUser) {
        alert('Login to use this feature')
        navigate('/auth/login')
    }

    //#endregion

    if (isLoading) {
        return <CLoading />
    }

    return (
        <div className="mx-2 pt-10 md:mx-10 lg:mx-20 xl:mx-40 2xl:mx-60">
            <div className="bg-white p-5">
                <div className="container grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {presentations.map((presentation, index) => {
                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded border border-gray-300 bg-white"
                            >
                                <div className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <Link
                                            className="mb-2 flex-1 text-xl font-bold"
                                            to={`/presentation/${presentation.id}/1/edit`}
                                        >
                                            <div>{presentation?.name}</div>
                                        </Link>

                                        <Dropdown
                                            arrowIcon={false}
                                            inline={true}
                                            placement="right"
                                            label={<EllipsisVerticalIcon className="h-7 w-7" />}
                                        >
                                            <Link to={'/silde/1'}>
                                                <Dropdown.Item className="text-[#1A94FF]">
                                                    <PlayIcon className="h-6 w-6 cursor-pointer pr-1 text-[#1A94FF]" />
                                                    <h3>Present</h3>
                                                </Dropdown.Item>
                                            </Link>

                                            <Dropdown.Item className="text-red-600">
                                                <XMarkIcon className="h-6 w-6 cursor-pointer pr-1 text-red-600" />
                                                <h3>Delete</h3>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    <Link to={`/presentation/${presentation.id}/1/edit`}>
                                        <div className="text-md mb-2 flex items-center">
                                            <div>
                                                <FireIcon className="mr-2 h-5 w-5" />
                                            </div>
                                            You are owner of this presentation
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MPresentationList