using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Wiki.Interfaces;
using Wiki.Services;
using Wiki.Model;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Wiki.ViewModels;

namespace Wiki.Authentication
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
       
        WikiDbContext db;
        public readonly IOptions<AppSettings> options;
        private readonly string Key;
        public JwtAuthenticationManager(WikiDbContext db, IOptions<AppSettings> options)
        {
            this.db = db;
            this.options = options;
            this.Key = options.Value.Key;
        }

        public UserViewModel Authenticate(UserViewModel userViewModel)
        {
            var user = db.Users.Where(e => e.UserName == userViewModel.UserName && e.Password == userViewModel.Password).FirstOrDefault();
            if (user != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.ASCII.GetBytes(Key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials
                                        (new SymmetricSecurityKey(tokenKey),
                                         SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                userViewModel.Token =tokenHandler.WriteToken(token);
                userViewModel.UserId = user.Id;
                userViewModel.Password = null;

               
                return userViewModel;
            }
            return null;
        }
    }
}
