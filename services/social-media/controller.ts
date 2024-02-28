import { ISocialMedia } from './interface'
import SocialMedia from './model'

export const createSocialMedia = async (
  socialMediaData: ISocialMedia[],
  id_employee: number
) => {
  const socialMediaPromises = socialMediaData.map(async (data) => {
    return SocialMedia.create({
      ...data,
      id_employee,
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
  employee_id: number
): Promise<void> => {
  try {
    await SocialMedia.destroy({
      where: { employee_id },
    })
  } catch (error) {
    console.error('Error deleting social media:', error)
    throw new Error('Error deleting social media')
  }
}
