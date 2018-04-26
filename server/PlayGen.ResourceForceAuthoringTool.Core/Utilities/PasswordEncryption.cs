using System;
using System.Security.Cryptography;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Core.Utilities
{
    public class PasswordEncryption
    {
        private const int BCryptWorkFactor = 13;

        public static string Encrypt(string password)
        {
			if (password.Length < 5)
			{
				throw new Exception("Password is too short");
			}
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
            
            //return BCrypt.Net.BCrypt.HashPassword(password, BCryptWorkFactor);
        }

        public static bool Verify(string password, string hash)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return (hash == BitConverter.ToString(hashedBytes).Replace("-", "").ToLower());
            }
            
            //return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
