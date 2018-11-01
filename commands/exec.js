const { exec } = require("child_process"); // Kita gunakan module child_process untuk memanipulasi system process. jangan add di dependencies sudah terpasang!

exports.run = async (bot, message, args) => { // Define sesuai dengan variable kalian.
    if(message.author.id !== '297130271864520705') return; // Kita restrict penggunaan command exec karena ini berpengaruh sama seperti eval.
    exec(args.join(' '), (error, output) => { // 2 Parameter 1. String yg akan dieksekusi 2. callback
        if(!error.length){ // Jika ada tidak ada error
            return message.channel.send(output, { code: 'bash'}); // Maka keluarkan output
        }
        // Jika error tidak ada maka kode percabangan diatas tidak akan dieksekusi
        return message.channel.send(error, { code: 'bash'}); //Maka defaultnya adalah kirim errornya
    });
}
