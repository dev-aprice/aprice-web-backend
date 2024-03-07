import { ISocialMedia } from './interface'
import SocialMedia from './model'

export const createSocialMedia = async (
  socialMediaData: ISocialMedia[],
  id: number,
  idType: 'employee' | 'partner'
) => {
  const socialMediaPromises = socialMediaData.map(async (data) => {
    const idKey = idType === 'employee' ? 'id_employee' : 'id_partner'

    return SocialMedia.create({
      ...data,
      [idKey]: id,
    })
  })
  await Promise.all(socialMediaPromises)
}

export const updateSocialMedia = async (
  socialMedia: Array<{ platform_name: string; profile_link: string }>,
  id_employee: number
): Promise<void> => {
  try {
    await SocialMedia.destroy({
      where: {
        id_employee,
      },
    })

    const createSocialMediaPromise = socialMedia.map((sm) =>
      SocialMedia.create({
        ...sm,
        id_employee,
      })
    )
    await Promise.all(createSocialMediaPromise)
  } catch (error) {
    console.error('Error updating social media:', error)
    throw new Error('Error updating social media')
  }
}

export const destroySocialMediaByEmployeeId = async (
  idType: 'employee' | 'partner',
  id: number
): Promise<void> => {
  try {
    const idKey = idType === 'employee' ? 'id_employee' : 'id_partner'

    await SocialMedia.destroy({
      where: { [idKey]: id },
    })
  } catch (error) {
    console.error('Error deleting social media:', error)
    throw new Error('Error deleting social media')
  }
}


