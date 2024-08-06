import os from 'os'

export default function ():string{
    const iFaces = os.networkInterfaces()  
    
    let iFace
    for(let key in iFaces){
        iFace = iFaces[key]?.find(item => {
            if(item.family == 'IPv4' && item.address){
                if(item.address != '192.168.1.253') {
                    return item                    
                }
            }
        })

        if(iFace) break
    }
    
    if(iFace){
        return iFace.address
    } else process.exit(1)
}