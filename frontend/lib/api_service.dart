import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'http://172.16.198.254:3000/api';

  Future<List<dynamic>> fetchUtilisateurs() async {
    final response = await http.get(Uri.parse('$baseUrl/utilisateurs'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du fetch');
    }
  }

  Future<void> addUtilisateur(String nom, String email, String phone) async {
    final response = await http.post(
      Uri.parse('$baseUrl/utilisateurs'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'nom': nom, 'email': email, 'phone': phone}),
    );
    if (response.statusCode != 201) {
      throw Exception('Erreur lors de l\'ajout');
    }
  }

  // Fonction pour se connecter
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body); // Réponse du serveur
    } else {
      throw Exception('Échec de la connexion');
    }
  }
}
