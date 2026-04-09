import random
def sieve_of_eratosthenes(n):
    is_prime=[1]*(n+1)
    is_prime[0]=is_prime[1]=0
    for i in range(2,int(n**0.5)+1):
        if is_prime[i]:
            for j in range(i*i,n+1,i):
                is_prime[j]=0
    return [x for x in range(2,n+1) if is_prime[x]]

primes=sieve_of_eratosthenes(10**5)

def simple_rsa_key_generation():
    p,q=random.sample(primes,2)
    n=p*q
    phi=(p-1)*(q-1)
    e=(1<<16)+1
    d=pow(e,-1,phi)
    
    PU=(e,n)
    PR=(d,n)
    return (PU,PR)

def rsa_encryption(data,pu):
    if data>=pu[1]: return -1
    
    C = pow(data,pu[0],pu[1])
    return C

def rsa_decryption(C,pr):
    M = pow(C,pr[0],pr[1])
    
    return M
    
def main():
    data=28123
    pu,pr = simple_rsa_key_generation()
    C = rsa_encryption(data,pu)
    M = rsa_decryption(C,pr)
    print(f"공개키: (e: {pu[0]}, n: {pu[1]}), 개인키: (d: {pr[0]}, n: {pr[1]})")
    print(f"평문 데이터: {data}")
    print(f"암호문: {C}")
    print(f"복호화된 데이터: {M}")
main()