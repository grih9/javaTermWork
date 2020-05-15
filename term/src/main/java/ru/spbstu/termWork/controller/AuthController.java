package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.spbstu.termWork.entity.User;
import ru.spbstu.termWork.repository.UserRepository;
import ru.spbstu.termWork.security.jwt.JwtTokenProvider;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepository;

//    @GetMapping("/signIn")
//    public ModelAndView newCustomerForm(ModelAndView model) {
//        User user = new User();
//        model.addObject("user", user);
//        model.setView("login_successfull");
//        return "login_successfull";
//    }

    @PostMapping(value = "/signIn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity signIn(@RequestBody AuthRequest request, Model model) {
        try {
            String name = request.getUserName();
            String password = request.getPassword();
            String token = jwtTokenProvider.createToken(
                    name, password,
                    userRepository.findUserByUserName(name)
                            .orElseThrow(() -> new UsernameNotFoundException("User is not found")).getRoles());

            model.addAttribute("userName", name);
            model.addAttribute("token", token);

            return ResponseEntity.ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
