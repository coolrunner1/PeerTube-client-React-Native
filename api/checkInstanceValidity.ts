export const checkInstanceValidity = async (newInstance: string): Promise<boolean> => {
    return !!await fetch(`${newInstance}/api/v1/config`)
        .then(res => res.ok)
        .catch(() => {})
}